module Component.Page.RegisterView exposing (..)

import Model.Page.RegisterModel exposing (..)
import Event exposing (Msg)
import Html exposing (..)
import Html.Attributes exposing (..)
import Event exposing (Msg(..))
import Component.Form as Form

view : RegisterModel -> Html Msg
view model = 
   Form.formFluid
      [ Form.heading "Register"
      , Form.formInput 
         { label = "Username" 
         , ty = "text"
         , value = model.username
         , onInput = UpdateRegisterUsername
         , error = getUsernameError model.errors
         }
      , Form.formInput
         { label = "Email"
         , ty = "email"
         , value = model.email
         , onInput = UpdateRegisterEmail
         , error = getEmailError model.errors
         }
      , Form.formInput
         { label = "Password"
         , ty = "password"
         , value = model.password
         , onInput = UpdateRegisterPassword
         , error = getPasswordError model.errors
         }
      , Form.formInput
         { label = "Confirm password"
         , ty = "password"
         , value = model.passwordAgain
         , onInput = UpdateRegisterPasswordAgain
         , error = getPasswordAgainError model.errors
         }
      , Form.switch        "Save session" model.saveSession UpdateRegisterSaveSession
      , Form.submitButton  "Register" (SubmitRegister model) model.registerButtonDisabled
      , Form.lnk           "Already have an account? Login!" "/login"
      ]