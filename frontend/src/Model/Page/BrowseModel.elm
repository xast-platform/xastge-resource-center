module Model.Page.BrowseModel exposing (..)

import Model.Asset exposing (Asset)
import Model.Page.RegisterModel exposing (SubmitStatus)

type alias BrowseModel =
   { name : String
   , assetType : String
   , tag : String
   , author : String
   , all : String
   , assets : List Asset
   , loading : Bool
   , loadingMore : Bool
   , page : Int
   , pageSize : Int
   , hasMore : Bool
   , status : Maybe SubmitStatus
   }

empty : BrowseModel
empty =
   { name = ""
   , assetType = ""
   , tag = ""
   , author = ""
   , all = ""
   , assets = []
   , loading = True
   , loadingMore = False
   , page = 1
   , pageSize = 50
   , hasMore = False
   , status = Nothing
   }
