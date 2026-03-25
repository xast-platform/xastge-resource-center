module Component.Page.LoginView exposing (..)

import Model.Page.LoginModel exposing (LoginModel)
import Event exposing (Msg)
import Html exposing (..)
import Html.Attributes exposing (..)
import Event exposing (Msg(..))
import Component.Form as Form

view : LoginModel -> Html Msg
view model = 
   Form.formFluid 
      [ Form.heading      "Login"
      -- , Form.formInput    "Email" "email" model.email UpdateLoginEmail
      -- , Form.formInput    "Password" "password" model.password UpdateLoginPassword
      , Form.switch       "Save session" model.saveSession UpdateLoginSaveSession
      , Form.submitButton "Login" (SubmitLogin model) model.loginButtonDisabled
      , Form.lnk "Don't have an account? Register!" "/register"
      ]