module Model.Page.HomeModel exposing (..)

import Model.Asset exposing (Asset)
import Model.Page.RegisterModel exposing (SubmitStatus)

type alias HomeModel =
   { quickSearch : String
   , latestAssets : List Asset
   , loadingLatest : Bool
   , status : Maybe SubmitStatus
   }

empty : HomeModel
empty =
   { quickSearch = ""
   , latestAssets = []
   , loadingLatest = True
   , status = Nothing
   }