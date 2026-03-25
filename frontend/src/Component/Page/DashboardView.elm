module Component.Page.DashboardView exposing (..)

import Model.Page.DashboardModel exposing (DashboardModel)
import Model.AccountStatus exposing (UserData)
import Event exposing (Msg)
import Html exposing (..)
import Html.Attributes exposing (..)
import Model.Page.DashboardModel exposing (DashboardTab(..))
import Html.Events exposing (onClick)
import Event exposing (Msg(..))
import List exposing (head)

view : DashboardModel -> UserData -> Html Msg
view model userData = 
   dashboardPanel
      { currentTab = model.tab
      , tabs = 
         [  (Home, "Home of ", 
               [ text "home tab"
               ]
            )
         ,  (Assets, "Assets", 
               [ text "assets tab"
               ]
            )
         ,  (Analytics, "Analytics", 
               [ text "analytics tab"
               ]
            )
         ,  (Settings, "Settings", 
               [ text "settings tab"
               ]
            )
         ]
      }

type alias DashboardPanelProps =
   { currentTab : DashboardTab
   , tabs : List (DashboardTab, String, List (Html Msg))
   }

dashboardPanel : DashboardPanelProps -> Html Msg
dashboardPanel props = 
   div [ class "d-flex flex-column flex-lg-row vh-100 mt-2" ]
      -- Control panel
      [ div [ class "border-end border-secondary text-white p-3 col-lg-2 col-md-12 col-12 col-sm-12 flex-lg-shrink-0" ]
         [ h3 [ class "ms-2 mb-3" ] [ text "Dashboard" ]
         -- Tabs
         , ul [ class "nav nav-pills flex-column mb-auto" ]
            ( props.tabs
               |> List.map (\(tab, name, _) ->
                  li [ class "nav-item mb-2" ]
                     [ a 
                        [ class "nav-link text-white"
                        , classList [("bg-secondary active", props.currentTab == tab)]
                        , onClick (SelectDashboardTab tab)
                        , href "#" 
                        ]
                        [ text name ]
                     ]
               )
            )
         ]
      , 
      -- Switched panel
      let currentState = 
            props.tabs
               |> List.filter (\(t, _, _) -> t == props.currentTab)
               |> head
      in case currentState of 
            Just (_, name, content) -> 
               div [ class "flex-grow-1 overflow-auto p-4 col-12 col-lg" ]
                  (  [ h1 [ class "text-light display-4" ] [ text (String.toUpper name) ]
                     , hr [class "border border-secondary opacity-50"] []
                     ] 
                     ++ content
                  )

            Nothing -> 
               invalidView "Selected tab doesn't exist."
      ]

invalidView : String -> Html msg
invalidView message = 
   div [ class "container-fluid mt-5 d-flex flex-column align-items-center" ]
      [ h1 [ class "display-2 text-light fw-bold mt-5 text-center" ] [ text "Invalid state" ]
      , h1 [ class "display-5 text-light text-center" ] [ text message ]
      ]