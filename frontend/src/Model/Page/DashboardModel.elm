module Model.Page.DashboardModel exposing (..)

import File exposing (File)
import Model.Asset exposing (Asset, AssetAnalytics)
import Model.Page.RegisterModel exposing (SubmitStatus)

type alias DashboardModel =
   { tab : DashboardTab
   , assetType : String
   , assetFile : Maybe File
   , thumbnailFile : Maybe File
   , description : String
   , tags : String
   , uploadButtonDisabled : Bool
   , uploadErrors : List UploadFieldError
   , uploadStatus : Maybe SubmitStatus
   , myAssets : List Asset
   , favoriteAssets : List Asset
   , analytics : List AssetAnalytics
   , loadingAssets : Bool
   , loadingAnalytics : Bool
   , listStatus : Maybe SubmitStatus
   , editingAsset : Maybe Asset
   , editAssetType : String
   , editDescription : String
   , editTags : String
   , editButtonDisabled : Bool
   , editStatus : Maybe SubmitStatus
   }

type UploadFieldError
   = AssetTypeError String
   | AssetFileError String
   | DescriptionError String
   | ThumbnailFileError String

type UploadField
   = AssetType
   | AssetFile
   | Description
   | ThumbnailFile

validateUploadField : UploadField -> DashboardModel -> DashboardModel
validateUploadField field model =
   case field of
      AssetType ->
         let
            error =
               if String.trim model.assetType == "" then
                  Just (AssetTypeError "Asset type is required")
               else
                  Nothing
         in
         { model | uploadErrors = uploadErrorInList AssetType error model.uploadErrors }

      AssetFile ->
         let
            error =
               case model.assetFile of
                  Just file ->
                     if File.size file <= 0 then
                        Just (AssetFileError "Asset file is empty")
                     else if isAssetFileValidForType model.assetType file then
                        Nothing
                     else
                        Just (AssetFileError (assetTypeErrorMessage model.assetType))

                  Nothing ->
                     Just (AssetFileError "Asset file is required")
         in
         { model | uploadErrors = uploadErrorInList AssetFile error model.uploadErrors }

      Description ->
         let
            trimmedDescription = String.trim model.description

            error =
               if trimmedDescription == "" then
                  Just (DescriptionError "Description is required")
               else if String.length trimmedDescription < 10 then
                  Just (DescriptionError "Description must be at least 10 characters long")
               else
                  Nothing
         in
         { model | uploadErrors = uploadErrorInList Description error model.uploadErrors }

      ThumbnailFile ->
         let
            error =
               Maybe.andThen 
                  (\file ->
                        if File.size file <= 0 then
                           Just (ThumbnailFileError "Thumbnail file is empty")
                        else if isImage file then
                           Nothing
                        else
                           Just (ThumbnailFileError "Thumbnail must be an image")
                  ) 
                  model.thumbnailFile 
         in
         { model | uploadErrors = uploadErrorInList ThumbnailFile error model.uploadErrors }

getAssetTypeError : List UploadFieldError -> Maybe String
getAssetTypeError errors =
   errors
      |> List.filterMap
         (\e ->
            case e of
               AssetTypeError message ->
                  Just message

               _ ->
                  Nothing
         )
      |> List.head

getAssetFileError : List UploadFieldError -> Maybe String
getAssetFileError errors =
   errors
      |> List.filterMap
         (\e ->
            case e of
               AssetFileError message ->
                  Just message

               _ ->
                  Nothing
         )
      |> List.head

getDescriptionError : List UploadFieldError -> Maybe String
getDescriptionError errors =
   errors
      |> List.filterMap
         (\e ->
            case e of
               DescriptionError message ->
                  Just message

               _ ->
                  Nothing
         )
      |> List.head

getThumbnailError : List UploadFieldError -> Maybe String
getThumbnailError errors =
   errors
      |> List.filterMap
         (\e ->
            case e of
               ThumbnailFileError message ->
                  Just message

               _ ->
                  Nothing
         )
      |> List.head

uploadErrorInList : UploadField -> Maybe UploadFieldError -> List UploadFieldError -> List UploadFieldError
uploadErrorInList field maybeError errors =
   let
      filteredErrors =
         List.filter
            (\e ->
               case ( field, e ) of
                  ( AssetType, AssetTypeError _ ) ->
                     False

                  ( AssetFile, AssetFileError _ ) ->
                     False

                  ( Description, DescriptionError _ ) ->
                     False

                  ( ThumbnailFile, ThumbnailFileError _ ) ->
                     False

                  _ ->
                     True
            )
            errors
   in
   case maybeError of
      Just err ->
         err :: filteredErrors

      Nothing ->
         filteredErrors

isAssetFileValidForType : String -> File -> Bool
isAssetFileValidForType assetType file =
   case assetType of
      "Model" ->
         isModel file

      "Texture" ->
         isImage file || isZip file

      "Audio" ->
         isAudio file

      "Script" ->
         isScript file || isZip file

      "Scene" ->
         isScene file

      _ ->
         True

assetTypeErrorMessage : String -> String
assetTypeErrorMessage assetType =
   case assetType of
      "Model" ->
         "Model supports .gltf, .glb, .obj, .zip"

      "Texture" ->
         "Texture supports image files and .zip"

      "Audio" ->
         "Audio must be an audio file"

      "Script" ->
         "Script supports .js, .ts, .lua, .py, .cs, .json, .zip"

      "Scene" ->
         "Scene supports .xsc, .zip, .rar, .7z"

      _ ->
         "Unsupported file type for selected asset type"

isZip : File -> Bool
isZip file =
   let
      mime =
         File.mime file

      name =
         String.toLower (File.name file)
   in
   List.any identity
      [ mime == "application/zip"
      , mime == "application/x-zip-compressed"
      , String.endsWith ".zip" name
      ]

isModel : File -> Bool
isModel file =
   let
      mime =
         File.mime file

      name =
         String.toLower (File.name file)
   in
   List.any identity
      [ isZip file
      , mime == "model/gltf+json"
      , mime == "model/gltf-binary"
      , String.endsWith ".gltf" name
      , String.endsWith ".glb" name
      , String.endsWith ".obj" name
      ]

isImage : File -> Bool
isImage file =
   String.startsWith "image/" (File.mime file)

isAudio : File -> Bool
isAudio file =
   String.startsWith "audio/" (File.mime file)

isScript : File -> Bool
isScript file =
   let
      mime =
         File.mime file

      name =
         String.toLower (File.name file)
   in
   List.any identity
      [ mime == "text/plain"
      , mime == "application/javascript"
      , mime == "text/javascript"
      , mime == "application/json"
      , String.endsWith ".js" name
      , String.endsWith ".ts" name
      , String.endsWith ".lua" name
      , String.endsWith ".py" name
      , String.endsWith ".cs" name
      , String.endsWith ".json" name
      ]

isScene : File -> Bool
isScene file =
   let
      name =
         String.toLower (File.name file)
   in
   List.any identity
      [ String.endsWith ".xsc" name
      , String.endsWith ".zip" name
      , String.endsWith ".rar" name
      , String.endsWith ".7z" name
      ]

type DashboardTab
   = Home
   | Favorite
   | Upload
   | Analytics
   | Settings

tagsFromString : String -> List String
tagsFromString tags =
   tags
      |> String.split ","
      |> List.map String.trim
      |> List.filter (\tag -> tag /= "")

tagsToString : List String -> String
tagsToString tags =
   String.join ", " tags

empty : DashboardModel
empty = 
   { tab = Home
   , assetType = "Scene"
   , assetFile = Nothing
   , thumbnailFile = Nothing
   , description = ""
   , tags = ""
   , uploadButtonDisabled = False
   , uploadErrors = []
   , uploadStatus = Nothing
   , myAssets = []
   , favoriteAssets = []
   , analytics = []
   , loadingAssets = False
   , loadingAnalytics = False
   , listStatus = Nothing
   , editingAsset = Nothing
   , editAssetType = "Scene"
   , editDescription = ""
   , editTags = ""
   , editButtonDisabled = False
   , editStatus = Nothing
   }