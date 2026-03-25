module Update exposing (..)

import Browser.Navigation as Nav
import Model exposing (Model)
import Event exposing (Msg(..))
import Browser exposing (UrlRequest(..))
import Model.Route exposing (parseUrl)
import Url
import Model.PageModel as PageModel
import Model.Page.RegisterModel exposing (validated)
import Model.Page.RegisterModel exposing (fieldsEmpty)

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model = 
   case msg of
      -- GENERAL
      UrlChange url ->
         let newRoute = parseUrl url
         in 
            (  { model 
               | route = newRoute 
               , page = PageModel.fromRoute newRoute
               }
            , Cmd.none
            )

      LinkClicked req ->
         case req of 
            External href ->
               ( model, Nav.load href )

            Internal url ->
               ( model, Nav.pushUrl model.key (Url.toString url) )     
      
      SetBackend backend -> 
         ({ model | backend = backend }, Cmd.none)

      -- REGISTER
      UpdateRegisterUsername str ->
         case model.page of
            PageModel.Register rm -> ( { model | page = PageModel.Register (validated { rm | username = str }) }, Cmd.none )
            _ -> ( model, Cmd.none )

      UpdateRegisterEmail str ->
         case model.page of
            PageModel.Register rm -> ( { model | page = PageModel.Register (validated { rm | email = str }) }, Cmd.none )
            _ -> ( model, Cmd.none )

      UpdateRegisterPassword str ->
         case model.page of
            PageModel.Register rm -> ( { model | page = PageModel.Register (validated { rm | password = str }) }, Cmd.none )
            _ -> ( model, Cmd.none )

      UpdateRegisterPasswordAgain str ->
         case model.page of
            PageModel.Register rm -> ( { model | page = PageModel.Register (validated { rm | passwordAgain = str }) }, Cmd.none )
            _ -> ( model, Cmd.none )

      UpdateRegisterSaveSession val ->
         case model.page of
            PageModel.Register rm -> ( { model | page = PageModel.Register { rm | saveSession = val } }, Cmd.none )
            _ -> ( model, Cmd.none )

      SubmitRegister registerModel ->
         if fieldsEmpty registerModel then
            let _ = Debug.log "A" ""
            in (model, Cmd.none)
         else
            (  { model
               | page = PageModel.Register
                  { registerModel
                  | registerButtonDisabled = True
                  }
               }
            , Cmd.none
            )


      -- LOGIN
      UpdateLoginEmail str ->
         case model.page of
            PageModel.Login lm -> ( { model | page = PageModel.Login { lm | email = str } }, Cmd.none )
            _ -> ( model, Cmd.none )

      UpdateLoginPassword str ->
         case model.page of
            PageModel.Login lm -> ( { model | page = PageModel.Login { lm | password = str } }, Cmd.none )
            _ -> ( model, Cmd.none )

      UpdateLoginSaveSession val ->
         case model.page of
            PageModel.Login lm -> ( { model | page = PageModel.Login { lm | saveSession = val } }, Cmd.none )
            _ -> ( model, Cmd.none )

      SubmitLogin loginModel ->
         (  { model 
            | page = PageModel.Login 
               { loginModel 
               | loginButtonDisabled = True 
               }
            }
         , Cmd.none
         )

      _ -> (model, Cmd.none)