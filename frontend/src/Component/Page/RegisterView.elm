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
      , Form.submitStatus model.submitStatus
      , Form.formInput 
         { label = "Username" 
         , ty = "text"
         , value = model.username
         , onInput = UpdateRegisterField Username
         , error = getUsernameError model.errors
         , maxlength = Nothing
         }
      , Form.formInput
         { label = "Email"
         , ty = "email"
         , value = model.email
         , onInput = UpdateRegisterField Email
         , error = getEmailError model.errors
         , maxlength = Nothing
         }
      , Form.formInput
         { label = "Password"
         , ty = "password"
         , value = model.password
         , onInput = UpdateRegisterField Password
         , error = getPasswordError model.errors
         , maxlength = Nothing
         }
      , Form.formInput
         { label = "Confirm password"
         , ty = "password"
         , value = model.passwordAgain
         , onInput = UpdateRegisterField PasswordAgain
         , error = getPasswordAgainError model.errors
         , maxlength = Nothing
         }
      , Form.switch        "Save session" model.saveSession UpdateRegisterSaveSession
      , Form.submitButton  "Register" (SubmitRegister model) model.registerButtonDisabled
      , Form.lnk           "Already have an account? Login!" "/login"
      ]