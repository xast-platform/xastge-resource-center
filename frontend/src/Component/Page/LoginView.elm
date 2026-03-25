module Component.Page.LoginView exposing (..)

import Model.Page.LoginModel exposing (LoginModel)
import Event exposing (Msg)
import Html exposing (..)
import Html.Attributes exposing (..)
import Event exposing (Msg(..))
import Component.Form as Form
import Model.Page.LoginModel exposing (..)

view : LoginModel -> Html Msg
view model = 
   Form.formFluid 
      [ Form.heading "Login"
      , Form.formInput
         { label = "Username" 
         , ty = "text"
         , value = model.username
         , onInput = UpdateLoginField Username
         , error = getUsernameError model.errors
         }
      , Form.formInput
         { label = "Password"
         , ty = "password"
         , value = model.password
         , onInput = UpdateLoginField Password
         , error = getPasswordError model.errors
         }
      , Form.switch        "Save session" model.saveSession UpdateLoginSaveSession
      , Form.submitButton  "Login" (SubmitLogin model) model.loginButtonDisabled
      , Form.lnk           "Don't have an account? Register!" "/register"
      ]