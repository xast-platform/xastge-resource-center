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
import LucideIcons as LucideIcon

view : DashboardModel -> UserData -> Html Msg
view model _ = 
   dashboardPanel
      { currentTab = model.tab
      , tabs = 
         [  ( Home, "Home", 
               [ subsection "Latest favorite"
                  [ card
                     { image = "https://dummyimage.com/200x200/a6a6a6/ffffff.png"
                     , label = "Asset 1"
                     , buttons =
                        [  { icon = LucideIcon.starIcon []
                           , color = Warning
                           }
                        ]
                     }
                  ]
               , subsection "Latest added" 
                  [ card
                     { image = "https://dummyimage.com/200x200/a6a6a6/ffffff.png"
                     , label = "Asset 2"
                     , buttons =
                        [  { icon = LucideIcon.pencilIcon []
                           , color = Secondary
                           }
                        ,  { icon = LucideIcon.trash2Icon []
                           , color = Danger
                           }
                        ]
                     }
                  , card
                     { image = "https://dummyimage.com/200x200/a6a6a6/ffffff.png"
                     , label = "Asset with long name"
                     , buttons =
                        [  { icon = LucideIcon.pencilIcon []
                           , color = Secondary
                           }
                        ,  { icon = LucideIcon.trash2Icon []
                           , color = Danger
                           }
                        ]
                     }
                  ]
               ]
            )
         ,  ( Favorite, "Favorite", 
               [ text "favorite tab"
               ]
            )
         ,  ( Uploaded, "Uploaded", 
               [ text "assets tab"
               ]
            )
         ,  ( Analytics, "Analytics", 
               [ text "analytics tab"
               ]
            )
         ,  ( Settings, "Settings", 
               [ text "settings tab"
               ]
            )
         ]
      }

card : CardProps msg -> Html msg
card props = 
   div [ class "card text-bg-dark border border-secondary", title props.label, attribute "style" "width: 200px;" ]
      [ img [ class "card-img-top border-bottom border-secondary", src props.image ] []
      , div [ class "card-body d-flex p-2" ]
         ( p [ class "card-title m-0 me-auto text-truncate", title props.label ] 
            [ text props.label ]
            ::
            ( props.buttons |> List.map (\btn -> 
               span [ class "card-title m-0 ms-1", class ("text-" ++ colorToSuffix btn.color), attribute "role" "button" ]
                  [ btn.icon ]
               )
            )
         )
      ]

type alias CardProps msg =
   { image : String
   , label : String
   , buttons : List (CardButton msg)
   }

type alias CardButton msg =
   { icon : Html msg
   , color : CardButtonColor
   }

type CardButtonColor
   = Info
   | Warning
   | Success
   | Danger
   | Primary
   | Secondary
   | Light

colorToSuffix : CardButtonColor -> String
colorToSuffix color =
   case color of
      Info -> "info"
      Warning -> "warning"
      Success -> "success"
      Danger -> "danger"
      Primary -> "primary"
      Secondary -> "secondary"
      Light -> "light"

subsection : String -> List (Html msg) -> Html msg
subsection name comps = 
   div [] 
   [ h2 [ class "text-light mb-2" ] [ text (String.toUpper name) ]
   , div [ class "border border-secondary rounded p-3 d-flex flex-wrap gap-3 mb-4" ] comps
   ]

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
                     , hr [class "border border-secondary opacity-50 mb-4"] []
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