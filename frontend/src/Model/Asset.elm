module Model.Asset exposing (..)

type alias Asset =
   { id : String
   , ownerId : String
   , assetType : String
   , description : String
   , tags : List String
   , fileName : String
   , fileUrl : String
   , thumbnailUrl : String
   , favoriteCount : Int
   , downloadCount : Int
   , isFavorite : Bool
   }

type alias AssetAnalytics =
   { assetType : String
   , totalDownloads : Int
   , assetsCount : Int
   }
