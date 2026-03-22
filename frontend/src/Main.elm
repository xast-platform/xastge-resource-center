module Main exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Model exposing (Model, init)
import Event exposing (Msg)
import Update exposing (update)
import Event exposing (Msg(..))

main : Program () Model Msg
main =
   Browser.application
      { init = init
      , view = \_ -> 
         { title = "XastGE Resource Center"
         , body = [ text "Hello World!" ]
         }
      , update = update
      , subscriptions = always Sub.none
      , onUrlChange = UrlChange
      , onUrlRequest = LinkClicked
      }