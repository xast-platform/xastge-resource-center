module Component.Page.ConfirmView exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Model.Page.ConfirmModel exposing (ConfirmModel)
import Model.Page.RegisterModel exposing (SubmitStatus(..))
import Component.Generic exposing (..)

view : ConfirmModel -> Html msg
view model =
   container [ class "text-bg-dark text-center" ]
      [ case model.status of
         Nothing ->
            div [ class "confirm-loading" ]
               [ text "Verifying your email..." ]
         
         Just (Success message) ->
            div [ class "confirm-success mt-5" ]
               [ h2 [ class "display-3" ] [ text "Email Confirmed!" ]
               , p [ class "lead" ] [ text message ]
               , a [ class "text-info", href "/login" ] [ text "Go to Login" ]
               ]
         
         Just (Error message) ->
            div [ class "confirm-error mt-5" ]
               [ h2 [ class "display-3" ] [ text "Verification Failed" ]
               , p [ class "lead" ] [ text message ]
               , a [ class "text-info", href "/register" ] [ text "Back to Registration" ]
               ]
      ]