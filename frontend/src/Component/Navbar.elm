module Component.Navbar exposing (..)

import Html.Attributes exposing (..)
import Html exposing (..)
import Model.AccountStatus exposing (AccountStatus)
import Model.AccountStatus as AccountStatus
import LucideIcons as LucideIcon
import Svg.Attributes as Svg

type alias NavbarProps =
   { icon : String 
   , brand : String
   , links : List (String, String)
   , accountStatus : AccountStatus
   }

view : NavbarProps -> Html msg
view props =
   nav [ class "navbar sticky-top navbar-expand-lg bg-dark navbar-dark" ]
      [ div [ class "container" ]
         [ branding props.icon props.brand
         , mobileToggler
         , navigation props.links props.accountStatus
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

navigation : List (String, String) -> AccountStatus -> Html msg
navigation links status = 
   div [ class "collapse navbar-collapse", id "navbarNavDropdown" ]
      [ ul [ class "navbar-nav nav-underline w-100 align-items-lg-center" ]
         ( (links |> List.map 
               ( \(name, link) -> 
                  li [ class "nav-item" ]
                     [ a [ class "nav-link text-light", href link ]
                        [ text name ]
                     ]
               )
            ) ++ 
            [ case status of
               AccountStatus.LoggedOut -> loggedOutView
               AccountStatus.LoggedIn username -> loggedInView username
            ]
         )
      ]

loggedOutView : Html msg
loggedOutView = 
   li [ class "nav-item ms-lg-auto" ]
      [ a [ class "nav-link text-info", href "/login" ] [ text "Login" ] ]

loggedInView : String -> Html msg
loggedInView username = 
   li [ class "nav-item dropdown ms-lg-auto" ]
      [ a
         [ class "nav-link dropdown-toggle d-flex align-items-center text-light"
         , href "#"
         , attribute "role" "button"
         , attribute "data-bs-toggle" "dropdown"
         , attribute "aria-expanded" "false"
         ]
         [ LucideIcon.circleUserRoundIcon [ Svg.class "me-2", Svg.width "18", Svg.height "18" ]
         , text username
         ]
      , ul [ class "dropdown-menu dropdown-menu-end" ]
         [ li []
            [ a [ class "dropdown-item", href "/dashboard" ] [ text "Dashboard" ]
            ]
         , li []
            [ a [ class "dropdown-item text-danger", href "/logout" ] [ text "Logout" ]
            ]
         ]
      ]