module Update exposing (..)

import Browser.Navigation as Nav
import Event exposing (Msg)
import Model exposing (Model)
import Event exposing (Msg(..))
import Browser exposing (UrlRequest(..))
import Url
import Model exposing (init)

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model = 
   case msg of
      UrlChange url ->
         init () url model.key

      LinkClicked req ->
         case req of 
            External href ->
               ( model, Nav.load href )

            Internal url ->
               ( model, Nav.pushUrl model.key (Url.toString url) )     
      
      _ -> (model, Cmd.none)