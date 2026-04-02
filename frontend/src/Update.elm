module Update exposing (..)

import Url
import Http
import Task
import Browser.Navigation as Nav
import Model exposing (Model)
import Event exposing (Msg(..))
import Browser exposing (UrlRequest(..))
import Model.Route as Route
import Model.Route exposing (Route, parseUrl)
import Model.PageModel as PageModel
import Model.Page.RegisterModel as Register
import Model.Page.LoginModel as Login
import Model.Page.DashboardModel as Dashboard
import Model.Page.AssetModel as AssetModel
import Model.Page.BrowseModel as BrowseModel
import Model.AccountStatus exposing (AccountStatus(..))
import Api.Rest exposing (login, register, uploadAsset, getAssets, getFavoriteAssets, getAssetById, toggleFavoriteAsset, reportAsset, updateAsset, deleteAsset, getDownloadAnalytics, getMe, getLatestAssets, getBrowseAssets)
import Api.Backend as Backend
import Api.Ports as Ports

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
   case msg of
      -- GENERAL
      UrlChange url ->
         let
            newRoute = parseUrl url
            nextPage =
               case newRoute of
                  Route.Browse ->
                     let
                        browseModel = BrowseModel.empty
                     in
                     PageModel.Browse { browseModel | all = getQueryParam "q" url.query }

                  _ ->
                     PageModel.fromRoute newRoute

            nextModel =
               { model
               | route = newRoute
               , page = nextPage
               }
         in
            ( nextModel
            , if shouldRedirectAuthenticated model.accountStatus newRoute then
                  Nav.replaceUrl model.key "/"
               else if shouldRedirectAnonymous model.accountStatus newRoute then
                  Nav.replaceUrl model.key "/login"
               else
                  loadRouteData nextModel
            )

      LinkClicked req ->
         case req of
            External href ->
               ( model, Nav.load href )

            Internal url ->
               ( model, Nav.pushUrl model.key (Url.toString url) )

      SetBackend backend ->
         ( { model | backend = backend }, Ports.saveBackend (Backend.toString backend) )

      LoadHomeData ->
         case model.page of
            PageModel.Home hm ->
               let
                  token =
                     case model.accountStatus of
                        LoggedIn userData ->
                           Just userData.token

                        LoggedOut ->
                           Nothing
               in
               ( { model | page = PageModel.Home { hm | loadingLatest = True, status = Nothing } }
               , getLatestAssets token
               )

            _ ->
               ( model, Cmd.none )

      UpdateHomeQuickSearch value ->
         case model.page of
            PageModel.Home hm ->
               ( { model | page = PageModel.Home { hm | quickSearch = value } }, Cmd.none )

            _ ->
               ( model, Cmd.none )

      SubmitHomeQuickSearch ->
         case model.page of
            PageModel.Home hm ->
               ( model, Nav.pushUrl model.key ("/browse?q=" ++ Url.percentEncode hm.quickSearch) )

            _ ->
               ( model, Cmd.none )

      HomeLatestAssetsReceived result ->
         case model.page of
            PageModel.Home hm ->
               case result of
                  Ok assets ->
                     ( { model | page = PageModel.Home { hm | latestAssets = assets, loadingLatest = False } }, Cmd.none )

                  Err err ->
                     ( { model | page = PageModel.Home { hm | loadingLatest = False, status = Just (Register.Error (httpErrorToMessage err)) } }, Cmd.none )

            _ ->
               ( model, Cmd.none )

      LoadBrowseData ->
         case model.page of
            PageModel.Browse bm ->
               let
                  token =
                     case model.accountStatus of
                        LoggedIn userData ->
                           Just userData.token

                        LoggedOut ->
                           Nothing
               in
               ( { model
                  | page =
                     PageModel.Browse
                        { bm
                        | loading = True
                        , loadingMore = False
                        , page = 1
                        , hasMore = False
                        , status = Nothing
                        }
                 }
               , getBrowseAssets
                  { token = token
                  , name = bm.name
                  , assetType = bm.assetType
                  , tag = bm.tag
                  , author = bm.author
                  , all = bm.all
                  , page = 1
                  , limit = bm.pageSize
                  }
               )

            _ ->
               ( model, Cmd.none )

      UpdateBrowseName value ->
         case model.page of
            PageModel.Browse bm ->
               ( { model | page = PageModel.Browse { bm | name = value } }, Cmd.none )

            _ ->
               ( model, Cmd.none )

      UpdateBrowseType value ->
         case model.page of
            PageModel.Browse bm ->
               ( { model | page = PageModel.Browse { bm | assetType = value } }, Cmd.none )

            _ ->
               ( model, Cmd.none )

      UpdateBrowseTag value ->
         case model.page of
            PageModel.Browse bm ->
               ( { model | page = PageModel.Browse { bm | tag = value } }, Cmd.none )

            _ ->
               ( model, Cmd.none )

      UpdateBrowseAuthor value ->
         case model.page of
            PageModel.Browse bm ->
               ( { model | page = PageModel.Browse { bm | author = value } }, Cmd.none )

            _ ->
               ( model, Cmd.none )

      UpdateBrowseAll value ->
         case model.page of
            PageModel.Browse bm ->
               ( { model | page = PageModel.Browse { bm | all = value } }, Cmd.none )

            _ ->
               ( model, Cmd.none )

      SubmitBrowseSearch ->
         case model.page of
            PageModel.Browse _ ->
               ( model, Task.perform identity (Task.succeed LoadBrowseData) )

            _ ->
               ( model, Cmd.none )

      SubmitBrowseLoadMore ->
         case model.page of
            PageModel.Browse bm ->
               if bm.loading || bm.loadingMore || not bm.hasMore then
                  ( model, Cmd.none )
               else
                  let
                     token =
                        case model.accountStatus of
                           LoggedIn userData ->
                              Just userData.token

                           LoggedOut ->
                              Nothing

                     nextPage = bm.page + 1
                  in
                  ( { model | page = PageModel.Browse { bm | loadingMore = True, status = Nothing } }
                  , getBrowseAssets
                     { token = token
                     , name = bm.name
                     , assetType = bm.assetType
                     , tag = bm.tag
                     , author = bm.author
                     , all = bm.all
                     , page = nextPage
                     , limit = bm.pageSize
                     }
                  )

            _ ->
               ( model, Cmd.none )

      BrowseAssetsReceived result ->
         case model.page of
            PageModel.Browse bm ->
               case result of
                  Ok assets ->
                     if bm.loadingMore then
                        ( { model
                           | page =
                              PageModel.Browse
                                 { bm
                                 | assets = bm.assets ++ assets
                                 , loading = False
                                 , loadingMore = False
                                 , page = bm.page + 1
                                 , hasMore = List.length assets == bm.pageSize
                                 }
                          }
                        , Cmd.none
                        )
                     else
                        ( { model
                           | page =
                              PageModel.Browse
                                 { bm
                                 | assets = assets
                                 , loading = False
                                 , loadingMore = False
                                 , page = 1
                                 , hasMore = List.length assets == bm.pageSize
                                 }
                          }
                        , Cmd.none
                        )

                  Err err ->
                     ( { model
                        | page =
                           PageModel.Browse
                              { bm
                              | loading = False
                              , loadingMore = False
                              , status = Just (Register.Error (httpErrorToMessage err))
                              }
                       }
                     , Cmd.none
                     )

            _ ->
               ( model, Cmd.none )

      LoadDashboardData ->
         case ( model.accountStatus, model.page ) of
            ( LoggedIn userData, PageModel.Dashboard dbm ) ->
               ( { model
                  | page =
                     PageModel.Dashboard
                        { dbm
                        | loadingAssets = True
                        , loadingAnalytics = True
                        , listStatus = Nothing
                        }
                 }
               , Cmd.batch
                  [ getMe userData.token
                  , getAssets { token = Just userData.token, mine = True, favorites = False }
                  , getFavoriteAssets { token = Just userData.token, mine = False, favorites = True }
                  , getDownloadAnalytics { token = userData.token }
                  ]
               )

            _ ->
               ( model, Cmd.none )

      LoadAssetPage assetId ->
         let
            token =
               case model.accountStatus of
                  LoggedIn userData ->
                     Just userData.token

                  LoggedOut ->
                     Nothing

            nextModel =
               { model | page = PageModel.Asset (AssetModel.init assetId) }
         in
            ( nextModel
            , getAssetById { id = assetId, token = token }
            )

      -- REGISTER
      UpdateRegisterField field str ->
         case model.page of
            PageModel.Register rm ->
               ( { model | page = PageModel.Register
                     ( case field of
                        Register.Username -> Register.validateField Register.Username { rm | username = str, submitStatus = Nothing }
                        Register.Email -> Register.validateField Register.Email { rm | email = str, submitStatus = Nothing }
                        Register.Password -> Register.validateField Register.Password { rm | password = str, submitStatus = Nothing }
                        Register.PasswordAgain -> Register.validateField Register.PasswordAgain { rm | passwordAgain = str, submitStatus = Nothing }
                     )
                  }
               , Cmd.none
               )

            _ ->
               ( model, Cmd.none )

      UpdateRegisterSaveSession val ->
         case model.page of
            PageModel.Register rm ->
               ( { model | page = PageModel.Register { rm | saveSession = val } }, Cmd.none )

            _ ->
               ( model, Cmd.none )

      SubmitRegister registerModel ->
         let
            newModel =
               registerModel
                  |> Register.validateField Register.Username
                  |> Register.validateField Register.Email
                  |> Register.validateField Register.Password
                  |> Register.validateField Register.PasswordAgain
         in
            if List.isEmpty newModel.errors then
               ( { model
                  | page =
                     PageModel.Register
                        { newModel
                        | registerButtonDisabled = True
                        }
                 }
               , register
                  { username = newModel.username
                  , email = newModel.email
                  , password = newModel.password
                  , saveSession = newModel.saveSession
                  }
               )
            else
               ( { model | page = PageModel.Register newModel }, Cmd.none )

      RegisterResponseReceived result ->
         case model.page of
            PageModel.Register rm ->
               case result of
                  Ok userData ->
                     ( { model
                        | page =
                           PageModel.Register
                              { rm
                              | registerButtonDisabled = False
                              , submitStatus =
                                 Just
                                    (Register.Success
                                       (if userData.confirmed then
                                           "Registered successfully"
                                        else
                                           "Registered. Please verify your email before uploading assets"
                                       )
                                    )
                              }
                        , accountStatus = LoggedIn userData
                       }
                     , Cmd.batch
                        [ Ports.saveUserData userData
                        , Nav.pushUrl model.key "/dashboard"
                        ]
                     )

                  Err err ->
                     ( { model
                        | page =
                           PageModel.Register
                              { rm
                              | registerButtonDisabled = False
                              , submitStatus = Just (Register.Error (httpErrorToMessage err))
                              }
                       }
                     , Cmd.none
                     )

            _ ->
               ( model, Cmd.none )

      -- LOGIN
      UpdateLoginField field str ->
         case model.page of
            PageModel.Login lm ->
               ( { model | page = PageModel.Login
                     ( case field of
                        Login.Username -> Login.validateField Login.Username { lm | username = str }
                        Login.Password -> Login.validateField Login.Password { lm | password = str }
                     )
                  }
               , Cmd.none
               )

            _ ->
               ( model, Cmd.none )

      UpdateLoginSaveSession val ->
         case model.page of
            PageModel.Login lm ->
               ( { model | page = PageModel.Login { lm | saveSession = val } }, Cmd.none )

            _ ->
               ( model, Cmd.none )

      SubmitLogin loginModel ->
         let
            newModel =
               loginModel
                  |> Login.validateField Login.Username
                  |> Login.validateField Login.Password
         in
            if List.isEmpty newModel.errors then
               ( { model
                  | page =
                     PageModel.Login
                        { newModel
                        | loginButtonDisabled = True
                        }
                 }
               , login
                  { username = newModel.username
                  , password = newModel.password
                  , saveSession = newModel.saveSession
                  }
               )
            else
               ( { model | page = PageModel.Login newModel }, Cmd.none )

      LoginResponseReceived result ->
         case model.page of
            PageModel.Login lm ->
               case result of
                  Ok userData ->
                     ( { model
                        | page =
                           PageModel.Login
                              { lm
                              | loginButtonDisabled = False
                              , submitStatus = Just (Register.Success "Logged in successfully")
                              }
                        , accountStatus = LoggedIn userData
                       }
                     , Cmd.batch
                        [ Ports.saveUserData userData
                        , Nav.pushUrl model.key "/dashboard"
                        ]
                     )

                  Err err ->
                     ( { model
                        | page =
                           PageModel.Login
                              { lm
                              | loginButtonDisabled = False
                              , submitStatus = Just (Register.Error (httpErrorToMessage err))
                              }
                       }
                     , Cmd.none
                     )

            _ ->
               ( model, Cmd.none )

      Logout ->
         ( { model | accountStatus = LoggedOut }
         , Cmd.batch
            [ Ports.cleanUserData ()
            , Nav.pushUrl model.key "/login"
            ]
         )

      -- DASHBOARD
      SelectDashboardTab tab ->
         case model.page of
            PageModel.Dashboard dbm ->
               ( { model | page = PageModel.Dashboard { dbm | tab = tab } }, Cmd.none )

            _ ->
               ( model, Cmd.none )

      DashboardMyAssetsReceived result ->
         case model.page of
            PageModel.Dashboard dbm ->
               case result of
                  Ok assets ->
                     ( { model | page = PageModel.Dashboard { dbm | myAssets = assets, loadingAssets = False } }, Cmd.none )

                  Err err ->
                     ( { model | page = PageModel.Dashboard { dbm | loadingAssets = False, listStatus = Just (Register.Error (httpErrorToMessage err)) } }, Cmd.none )

            _ ->
               ( model, Cmd.none )

      MeResponseReceived result ->
         case ( model.accountStatus, result ) of
            ( LoggedIn existing, Ok meUser ) ->
               let
                  mergedUser =
                     { meUser | token = existing.token }

                  nextModel =
                     { model | accountStatus = LoggedIn mergedUser }
               in
               ( nextModel, Ports.saveUserData mergedUser )

            _ ->
               ( model, Cmd.none )

      DashboardFavoriteAssetsReceived result ->
         case model.page of
            PageModel.Dashboard dbm ->
               case result of
                  Ok assets ->
                     ( { model | page = PageModel.Dashboard { dbm | favoriteAssets = assets } }, Cmd.none )

                  Err _ ->
                     ( model, Cmd.none )

            _ ->
               ( model, Cmd.none )

      DashboardAnalyticsReceived result ->
         case model.page of
            PageModel.Dashboard dbm ->
               case result of
                  Ok analytics ->
                     ( { model | page = PageModel.Dashboard { dbm | analytics = analytics, loadingAnalytics = False } }, Cmd.none )

                  Err _ ->
                     ( { model | page = PageModel.Dashboard { dbm | loadingAnalytics = False } }, Cmd.none )

            _ ->
               ( model, Cmd.none )

      UpdateDashboardAssetType assetType ->
         case model.page of
            PageModel.Dashboard dbm ->
               ( { model
                  | page =
                     PageModel.Dashboard
                        (Dashboard.validateUploadField Dashboard.AssetType
                           { dbm
                           | assetType = assetType
                           , uploadStatus = Nothing
                           }
                        )
                 }
               , Cmd.none
               )

            _ ->
               ( model, Cmd.none )

      UpdateDashboardDescription description ->
         case model.page of
            PageModel.Dashboard dbm ->
               ( { model
                  | page =
                     PageModel.Dashboard
                        (Dashboard.validateUploadField Dashboard.Description
                           { dbm
                           | description = description
                           , uploadStatus = Nothing
                           }
                        )
                 }
               , Cmd.none
               )

            _ ->
               ( model, Cmd.none )

      UpdateDashboardTags tags ->
         case model.page of
            PageModel.Dashboard dbm ->
               ( { model | page = PageModel.Dashboard { dbm | tags = tags, uploadStatus = Nothing } }
               , Cmd.none
               )

            _ ->
               ( model, Cmd.none )

      SelectDashboardAssetFile assetFile ->
         case model.page of
            PageModel.Dashboard dbm ->
               ( { model
                  | page =
                     PageModel.Dashboard
                        (Dashboard.validateUploadField Dashboard.AssetFile
                           { dbm
                           | assetFile = Just assetFile
                           , uploadStatus = Nothing
                           }
                        )
                 }
               , Cmd.none
               )

            _ ->
               ( model, Cmd.none )

      SelectDashboardThumbnailFile thumbnailFile ->
         case model.page of
            PageModel.Dashboard dbm ->
               ( { model
                  | page =
                     PageModel.Dashboard
                        (Dashboard.validateUploadField Dashboard.ThumbnailFile
                           { dbm
                           | thumbnailFile = Just thumbnailFile
                           , uploadStatus = Nothing
                           }
                        )
                 }
               , Cmd.none
               )

            _ ->
               ( model, Cmd.none )

      SubmitDashboardUpload ->
         case model.page of
            PageModel.Dashboard dbm ->
               let
                  validatedModel =
                     dbm
                        |> Dashboard.validateUploadField Dashboard.AssetType
                        |> Dashboard.validateUploadField Dashboard.AssetFile
                        |> Dashboard.validateUploadField Dashboard.ThumbnailFile
                        |> Dashboard.validateUploadField Dashboard.Description
               in
                  if List.isEmpty validatedModel.uploadErrors then
                     case ( model.accountStatus, validatedModel.assetFile ) of
                        ( LoggedIn userData, Just assetFile ) ->
                           if userData.confirmed then
                              ( { model
                                 | page =
                                    PageModel.Dashboard
                                       { validatedModel
                                       | uploadButtonDisabled = True
                                       }
                                }
                              , uploadAsset
                                 { assetType = validatedModel.assetType
                                 , description = String.trim validatedModel.description
                                 , tags = validatedModel.tags
                                 , token = userData.token
                                 , assetFile = assetFile
                                 , thumbnailFile = validatedModel.thumbnailFile
                                 }
                              )
                           else
                              ( { model
                                 | page =
                                    PageModel.Dashboard
                                       { validatedModel
                                       | uploadStatus = Just (Register.Error "Confirm your email before uploading")
                                       }
                                }
                              , Cmd.none
                              )

                        ( LoggedOut, _ ) ->
                           ( { model
                              | page =
                                 PageModel.Dashboard
                                    { validatedModel
                                    | uploadStatus = Just (Register.Error "You must be logged in")
                                    }
                             }
                           , Cmd.none
                           )

                        ( _, Nothing ) ->
                           ( { model | page = PageModel.Dashboard validatedModel }, Cmd.none )
                  else
                     ( { model | page = PageModel.Dashboard validatedModel }, Cmd.none )

            _ ->
               ( model, Cmd.none )

      DashboardUploadResponseReceived result ->
         case model.page of
            PageModel.Dashboard dbm ->
               case result of
                  Ok message ->
                     ( { model
                        | page =
                           PageModel.Dashboard
                              { dbm
                              | assetType = "Scene"
                              , assetFile = Nothing
                              , thumbnailFile = Nothing
                              , description = ""
                              , tags = ""
                              , uploadButtonDisabled = False
                              , uploadErrors = []
                              , uploadStatus = Just (Register.Success message)
                              }
                       }
                     , loadRouteData model
                     )

                  Err err ->
                     ( { model
                        | page =
                           PageModel.Dashboard
                              { dbm
                              | uploadButtonDisabled = False
                              , uploadStatus = Just (Register.Error (httpErrorToMessage err))
                              }
                       }
                     , Cmd.none
                     )

            _ ->
               ( model, Cmd.none )

      OpenDashboardEditAsset asset ->
         case model.page of
            PageModel.Dashboard dbm ->
               ( { model
                  | page =
                     PageModel.Dashboard
                        { dbm
                        | editingAsset = Just asset
                        , editAssetType = asset.assetType
                        , editDescription = asset.description
                        , editTags = Dashboard.tagsToString asset.tags
                        , editStatus = Nothing
                        }
                 }
               , Cmd.none
               )

            _ ->
               ( model, Cmd.none )

      CloseDashboardEditAsset ->
         case model.page of
            PageModel.Dashboard dbm ->
               ( { model
                  | page =
                     PageModel.Dashboard
                        { dbm
                        | editingAsset = Nothing
                        , editStatus = Nothing
                        }
                 }
               , Cmd.none
               )

            _ ->
               ( model, Cmd.none )

      UpdateDashboardEditAssetType value ->
         case model.page of
            PageModel.Dashboard dbm ->
               ( { model | page = PageModel.Dashboard { dbm | editAssetType = value, editStatus = Nothing } }, Cmd.none )

            _ ->
               ( model, Cmd.none )

      UpdateDashboardEditDescription value ->
         case model.page of
            PageModel.Dashboard dbm ->
               ( { model | page = PageModel.Dashboard { dbm | editDescription = value, editStatus = Nothing } }, Cmd.none )

            _ ->
               ( model, Cmd.none )

      UpdateDashboardEditTags value ->
         case model.page of
            PageModel.Dashboard dbm ->
               ( { model | page = PageModel.Dashboard { dbm | editTags = value, editStatus = Nothing } }, Cmd.none )

            _ ->
               ( model, Cmd.none )

      SubmitDashboardEditAsset ->
         case ( model.accountStatus, model.page ) of
            ( LoggedIn userData, PageModel.Dashboard dbm ) ->
               case dbm.editingAsset of
                  Just asset ->
                     ( { model | page = PageModel.Dashboard { dbm | editButtonDisabled = True } }
                     , updateAsset
                        { id = asset.id
                        , token = userData.token
                        , assetType = dbm.editAssetType
                        , description = String.trim dbm.editDescription
                        , tags = dbm.editTags
                        }
                     )

                  Nothing ->
                     ( model, Cmd.none )

            _ ->
               ( model, Cmd.none )

      DashboardEditResponseReceived result ->
         case model.page of
            PageModel.Dashboard dbm ->
               case result of
                  Ok message ->
                     ( { model
                        | page =
                           PageModel.Dashboard
                              { dbm
                              | editButtonDisabled = False
                              , editStatus = Just (Register.Success message)
                              }
                       }
                     , loadRouteData model
                     )

                  Err err ->
                     ( { model
                        | page =
                           PageModel.Dashboard
                              { dbm
                              | editButtonDisabled = False
                              , editStatus = Just (Register.Error (httpErrorToMessage err))
                              }
                       }
                     , Cmd.none
                     )

            _ ->
               ( model, Cmd.none )

      SubmitDashboardDeleteAsset assetId ->
         case model.accountStatus of
            LoggedIn userData ->
               ( model, deleteAsset { id = assetId, token = userData.token } )

            LoggedOut ->
               ( model, Cmd.none )

      DashboardDeleteResponseReceived result ->
         case model.page of
            PageModel.Dashboard dbm ->
               case result of
                  Ok message ->
                     ( { model
                        | page =
                           PageModel.Dashboard
                              { dbm
                              | listStatus = Just (Register.Success message)
                              }
                       }
                     , loadRouteData model
                     )

                  Err err ->
                     ( { model
                        | page =
                           PageModel.Dashboard
                              { dbm
                              | listStatus = Just (Register.Error (httpErrorToMessage err))
                              }
                       }
                     , Cmd.none
                     )

            _ ->
               ( model, Cmd.none )

      -- ASSET PAGE
      AssetPageAssetReceived result ->
         case model.page of
            PageModel.Asset assetModel ->
               case result of
                  Ok asset ->
                     ( { model
                        | page =
                           PageModel.Asset
                              { assetModel
                              | loading = False
                              , asset = Just asset
                              }
                       }
                     , Cmd.none
                     )

                  Err err ->
                     ( { model
                        | page =
                           PageModel.Asset
                              { assetModel
                              | loading = False
                              , status = Just (Register.Error (httpErrorToMessage err))
                              }
                       }
                     , Cmd.none
                     )

            _ ->
               ( model, Cmd.none )

      ToggleAssetFavorite assetId isFavorite ->
         case model.accountStatus of
            LoggedIn userData ->
               ( model
               , toggleFavoriteAsset
                  { id = assetId
                  , token = userData.token
                  , isFavorite = isFavorite
                  }
               )

            LoggedOut ->
               ( model, Cmd.none )

      AssetFavoriteResponseReceived result ->
         case result of
            Ok _ ->
               ( model, loadRouteData model )

            Err err ->
               case model.page of
                  PageModel.Asset assetModel ->
                     ( { model
                        | page = PageModel.Asset { assetModel | status = Just (Register.Error (httpErrorToMessage err)) }
                       }
                     , Cmd.none
                     )

                  _ ->
                     ( model, Cmd.none )

      UpdateAssetReportReason reason ->
         case model.page of
            PageModel.Asset assetModel ->
               ( { model
                  | page =
                     PageModel.Asset
                        { assetModel
                        | reportReason = reason
                        , status = Nothing
                        }
                 }
               , Cmd.none
               )

            _ ->
               ( model, Cmd.none )

      SubmitAssetReport assetId ->
         case ( model.accountStatus, model.page ) of
            ( LoggedIn userData, PageModel.Asset assetModel ) ->
               ( model
               , reportAsset
                  { id = assetId
                  , token = userData.token
                  , reason =
                     if String.trim assetModel.reportReason == "" then
                        "Inappropriate content"
                     else
                        String.trim assetModel.reportReason
                  }
               )

            _ ->
               ( model, Cmd.none )

      AssetReportResponseReceived result ->
         case model.page of
            PageModel.Asset assetModel ->
               case result of
                  Ok message ->
                     ( { model
                        | page =
                           PageModel.Asset
                              { assetModel
                              | status = Just (Register.Success message)
                              , reportReason = ""
                              }
                       }
                     , Cmd.none
                     )

                  Err err ->
                     ( { model
                        | page =
                           PageModel.Asset
                              { assetModel
                              | status = Just (Register.Error (httpErrorToMessage err))
                              }
                       }
                     , Cmd.none
                     )

            _ ->
               ( model, Cmd.none )

      _ ->
         ( model, Cmd.none )


loadRouteData : Model -> Cmd Msg
loadRouteData model =
   case model.route of
      Route.Home ->
         Task.perform identity (Task.succeed LoadHomeData)

      Route.Browse ->
         Task.perform identity (Task.succeed LoadBrowseData)

      Route.Dashboard ->
         case model.accountStatus of
            LoggedIn _ ->
               Task.perform identity (Task.succeed LoadDashboardData)

            LoggedOut ->
               Cmd.none

      Route.Asset assetId ->
         case model.accountStatus of
            LoggedIn userData ->
               getAssetById { id = assetId, token = Just userData.token }

            LoggedOut ->
               getAssetById { id = assetId, token = Nothing }

      _ ->
         Cmd.none


shouldRedirectAuthenticated : AccountStatus -> Route -> Bool
shouldRedirectAuthenticated accountStatus route =
   case accountStatus of
      LoggedIn _ ->
         case route of
            Route.Login ->
               True

            Route.Register ->
               True

            _ ->
               False

      LoggedOut ->
         False


shouldRedirectAnonymous : AccountStatus -> Route -> Bool
shouldRedirectAnonymous accountStatus route =
   case accountStatus of
      LoggedOut ->
         case route of
            Route.Dashboard ->
               True

            _ ->
               False

      LoggedIn _ ->
         False


httpErrorToMessage : Http.Error -> String
httpErrorToMessage err =
   case err of
      Http.BadUrl _ ->
         "Invalid request URL"

      Http.Timeout ->
         "Request timed out"

      Http.NetworkError ->
         "Network error, check if backend is running"

      Http.BadStatus status ->
         if status == 409 then
            "Username or email already exists"
         else
            "Request failed"

      Http.BadBody message ->
         if String.trim message == "" then
            "Unexpected response from server"
         else
            message


getQueryParam : String -> Maybe String -> String
getQueryParam key maybeQuery =
   case maybeQuery of
      Nothing ->
         ""

      Just query ->
         query
            |> String.split "&"
            |> List.filterMap
               (\part ->
                  case String.split "=" part of
                     [ currentKey, rawValue ] ->
                        if currentKey == key then
                           Url.percentDecode rawValue
                        else
                           Nothing

                     [ currentKey ] ->
                        if currentKey == key then
                           Just ""
                        else
                           Nothing

                     _ ->
                        Nothing
               )
            |> List.head
            |> Maybe.withDefault ""
