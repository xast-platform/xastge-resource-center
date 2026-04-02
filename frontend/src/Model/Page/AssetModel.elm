module Model.Page.AssetModel exposing (..)

import Model.Asset exposing (Asset)
import Model.Page.RegisterModel exposing (SubmitStatus)

type alias AssetModel =
   { assetId : String
   , asset : Maybe Asset
   , loading : Bool
   , status : Maybe SubmitStatus
   , reportReason : String
   , showReportModal : Bool
   }

init : String -> AssetModel
init assetId =
   { assetId = assetId
   , asset = Nothing
   , loading = True
   , status = Nothing
   , reportReason = ""
   , showReportModal = False
   }
