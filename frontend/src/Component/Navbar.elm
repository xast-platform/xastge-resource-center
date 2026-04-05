module Component.Navbar exposing (..)

import Html.Attributes exposing (..)
import Html exposing (..)
import Model.AccountStatus exposing (AccountStatus)
import Model.AccountStatus as AccountStatus
import LucideIcons as LucideIcon
import Svg.Attributes as Svg
import Event exposing (Msg)
import Api.Backend exposing (Backend)
import Api.Backend as Backend
import Html.Events exposing (onClick)
import Event exposing (Msg(..))
import Component.Generic exposing (container)

type alias NavbarProps =
   { icon : String 
   , brand : String
   , links : List (String, String)
   , accountStatus : AccountStatus
   , backend : Backend
   }

view : NavbarProps -> Html Msg
view props =
   nav [ class "navbar sticky-top navbar-expand-lg bg-dark navbar-dark" ]
      [ container []
         [ branding props.icon props.brand
         , mobileToggler
         , navigation props.backend props.links props.accountStatus
         ]
      ]

branding : String -> String -> Html msg
branding icon brand = 
   a [ class "navbar-brand text-light fw-bold", href "/" ]
      [ img [ class "me-2 d-inline-block", src icon, width 30 ] []
      , text brand
      ]

mobileToggler : Html msg
mobileToggler = 
   button 
      [ attribute "aria-controls" "navbarNavDropdown", attribute "aria-expanded" "false", attribute "aria-label" "Toggle navigation", attribute "data-bs-target" "#navbarNavDropdown", attribute "data-bs-toggle" "collapse", type_ "button" 
      , class "navbar-toggler"
      ]
      [ span [ class "navbar-toggler-icon" ] 
         [ LucideIcon.ellipsisVerticalIcon [] ] 
      ]

navigation : Backend -> List (String, String) -> AccountStatus -> Html Msg
navigation backend links status = 
   div [ class "collapse navbar-collapse", id "navbarNavDropdown" ]
      [ ul [ class "navbar-nav nav-underline w-100 align-items-lg-center" ]
         -- Links
         ( (links |> List.map 
               ( \(name, link) -> 
                  li [ class "nav-item" ]
                     [ a [ class "nav-link text-light", href link ]
                        [ text name ]
                     ]
               )
            ) ++
         -- Account status
         [ case status of
            AccountStatus.LoggedOut -> loggedOutView
            AccountStatus.LoggedIn userData -> loggedInView Logout userData.username
         , apiModeToggler backend
         ])
      ]

apiModeToggler : Backend -> Html Msg
apiModeToggler backend = 
   li [ class "nav-item dropdown" ]
      [ button
         [ class "nav-link dropdown-toggle d-flex align-items-center text-light bg-transparent border-0"
         , type_ "button"
         , attribute "data-bs-toggle" "dropdown"
         , attribute "aria-expanded" "false"
         ]
         [ LucideIcon.chevronsLeftRightEllipsisIcon [ Svg.class "me-1" ]
         , text "API"
         ]
      , ul [ class "dropdown-menu dropdown-menu-dark dropdown-menu-end" ]
         [ li []
            [ button 
               [ classList
                  [ ( "dropdown-item", True )
                  , ( "text-info", backend == Backend.Rest )
                  ]
               , type_ "button"
               , onClick (SetBackend Backend.Rest)
               ] 
               [ LucideIcon.routeIcon [ Svg.class "me-1" ]
               , text "REST" 
               ]
            ]
         , li []
            [ button 
               [ classList
                  [ ( "dropdown-item", True )
                  , ( "text-info", backend == Backend.GraphQL )
                  ]
               , type_ "button"
               , onClick (SetBackend Backend.GraphQL)
               ] 
               [ LucideIcon.gitGraphIcon [ Svg.class "me-1" ]
               , text "GraphQL" 
               ]
            ]
         ]
      ]

loggedOutView : Html msg
loggedOutView = 
   li [ class "nav-item ms-lg-auto" ]
      [ a [ class "nav-link text-info", href "/login" ] [ text "Login" ] ]

loggedInView : msg -> String -> Html msg
loggedInView logoutEvent username = 
   li [ class "nav-item dropdown ms-lg-auto" ]
      [ button
         [ class "nav-link dropdown-toggle d-flex align-items-center text-light bg-transparent border-0"
         , type_ "button"
         , attribute "role" "button"
         , attribute "data-bs-toggle" "dropdown"
         , attribute "aria-expanded" "false"
         ]
         [ LucideIcon.circleUserRoundIcon [ Svg.class "me-1" ]
         , text username
         ]
      , ul [ class "dropdown-menu dropdown-menu-dark dropdown-menu-end" ]
         [ li []
            [ a [ class "dropdown-item", href "/dashboard" ] [ text "Dashboard" ]
            ]
         , li []
            [ button
               [ class "dropdown-item text-danger w-100 text-start"
               , type_ "button"
               , onClick logoutEvent 
               ] 
               [ text "Logout" ]
            ]
         ]
      ]