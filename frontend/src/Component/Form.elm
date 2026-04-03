module Component.Form exposing (..)

import File exposing (File)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (on, onCheck, onClick, onInput)
import Json.Decode as Decode
import Event exposing (Msg(..))
import Model.Page.RegisterModel as Register

submitStatus : Maybe Register.SubmitStatus -> Html msg
submitStatus maybeErr =
   case maybeErr of
      Just (Register.Error err) ->
         div [ class "alert alert-danger text-center" ] [ text err ]

      Just (Register.Success msg) ->
         div [ class "alert alert-success text-center" ] [ text msg ]

      Nothing ->
         text ""

formFluid : List (Html msg) -> Html msg
formFluid comps = 
   div [ class "container-fluid mt-5" ]
      [ div [ class "row justify-content-center px-3" ]
         [ div [ class "col-lg-3 col-md-6 col-sm-8 col-12 border mt-5 p-5 border-secondary rounded" ]
            [ Html.form [ class "form-dark" ]
               comps
            ]
         ]
      ]

lnk : String -> String -> Html msg
lnk lab hrf = 
   div [ class "mb-3 text-center" ] 
      [ a [ class "text-info", href hrf ] [ text lab ] ]

submitButton : String -> msg -> Bool -> Html msg
submitButton lab msg dis = 
   div [ class "d-flex justify-content-center mb-3" ]
      [ button 
         [ class "btn btn-info px-4"
         , type_ "button"
         , onClick msg
         , disabled dis
         , classList 
            [ ("btn-smooth", True)
            , ("is-disabled", dis)
            ]
         ] 
         [ text lab ]
      ]

dangerSubmitButton : String -> msg -> Bool -> Html msg
dangerSubmitButton lab msg dis = 
   div [ class "d-flex justify-content-center mb-3" ]
      [ button 
         [ class "btn btn-danger px-4"
         , type_ "button"
         , onClick msg
         , disabled dis
         , classList 
            [ ("btn-smooth", True)
            , ("is-disabled", dis)
            ]
         ] 
         [ text lab ]
      ]

cancelButton : String -> msg -> Bool -> Html msg
cancelButton lab msg dis = 
   div [ class "d-flex justify-content-center mb-3" ]
      [ button 
         [ class "btn btn-outline-danger px-5"
         , type_ "button"
         , onClick msg
         , disabled dis
         , classList 
            [ ("btn-smooth", True)
            , ("is-disabled", dis)
            ]
         ] 
         [ text lab ]
      ]

switch : String -> Bool -> (Bool -> msg) -> Html msg
switch lab val onCheckMsg = 
   div [ class "form-check form-switch mb-3" ]
      [ input [ class "form-check-input", id "switchCheckDefault", attribute "role" "switch", type_ "checkbox", checked val, onCheck onCheckMsg ]
         []
      , label [ class "form-check-label text-light", for "switchCheckDefault" ]
         [ text lab ]
      ]

heading : String -> Html msg
heading h = 
   h1 
      [ class "mb-3 text-center text-light mt-3" ]
      [ text h ]

formInput : FormInputProps msg -> Html msg
formInput props =
   div [ class "mb-3" ]
      ([ label [ class "form-label text-light" ] [ text props.label ]
      , input
         ([ class "form-control text-bg-dark border-secondary"
          , type_ props.ty
          , value props.value
          , onInput props.onInput
          ]
            ++ case props.maxlength of
                  Just max_val ->
                     [ maxlength max_val ]

                  Nothing ->
                     []
         )
         []
      ]
         ++ case props.error of
               Just err ->
                  [ p [ class "text-danger small mt-1" ] [ text err ] ]

               Nothing ->
                  []
      )

type alias FormInputProps msg =
   { label : String
   , ty : String
   , value : String
   , onInput : (String -> msg)
   , error : Maybe String
   , maxlength : Maybe Int
   }

formTextarea : FormTextareaProps msg -> Html msg
formTextarea props =
   div [ class "mb-3" ]
      ([ label [ class "form-label text-light" ] [ text props.label ]
      , textarea
         [ class "form-control text-bg-dark border-secondary"
         , rows props.rows
         , value props.value
         , onInput props.onInput
         ]
         []
      ]
         ++ case props.error of
               Just err ->
                  [ p [ class "text-danger small mt-1" ] [ text err ] ]

               Nothing ->
                  []
      )

type alias FormTextareaProps msg =
   { label : String
   , value : String
   , rows : Int
   , onInput : (String -> msg)
   , error : Maybe String
   }

formSelect : FormSelectProps msg -> Html msg
formSelect props =
   div [ class "mb-3" ]
      ([ label [ class "form-label text-light" ] [ text props.label ]
      , select
         [ class "form-select text-bg-dark border-secondary form-select-sm"
         , onInput props.onInput
         ]
         (props.options
            |> List.map
               (\optionValue ->
                  option [ selected (props.value == optionValue) ] [ text optionValue ]
               )
         )
      ]
         ++ case props.error of
               Just err ->
                  [ p [ class "text-danger small mt-1" ] [ text err ] ]

               Nothing ->
                  []
      )

type alias FormSelectProps msg =
   { label : String
   , value : String
   , options : List String
   , onInput : (String -> msg)
   , error : Maybe String
   }

fileInput : FileInputProps msg -> Html msg
fileInput props =
   div [ class "mb-3" ]
      ([ label [ class "form-label text-light" ] [ text props.label ]
      , input
         [ class "form-control text-bg-dark border-secondary form-control-sm"
         , type_ "file"
         , on "change" (Decode.map props.onSelect (Decode.at [ "target", "files", "0" ] File.decoder))
         ]
         []
      ]
         ++ case props.error of
               Just err ->
                  [ p [ class "text-danger small mt-1" ] [ text err ] ]

               Nothing ->
                  []
      )

type alias FileInputProps msg =
   { label : String
   , onSelect : (File -> msg)
   , fileName : Maybe String
   , error : Maybe String
   }