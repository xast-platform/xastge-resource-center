module Main exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Model exposing (Model, init)
import Event exposing (Msg)
import Update exposing (update)
import Event exposing (Msg(..))

import Model.Route exposing (getTitle)
import Component.AppView as AppView

main : Program () Model Msg
main =
   Browser.application
      { init = init
      , view = \m -> 
         { title = getTitle m.route
         , body = AppView.view m
         }
      , update = update
      , subscriptions = always Sub.none
      , onUrlChange = UrlChange
      , onUrlRequest = LinkClicked
      }