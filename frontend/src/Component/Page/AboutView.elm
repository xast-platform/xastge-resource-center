module Component.Page.AboutView exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import LucideIcons as LucideIcon
import Svg.Attributes as Svg
import Svg
import Component.Generic exposing (container)

view : Html msg
view = aboutPanel
   { heading = "About XastGE Resource Center"
   , description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut finibus odio non faucibus mattis. Curabitur ullamcorper sed mauris eget rutrum. Sed consectetur tellus in massa auctor rhoncus ut eu justo. Praesent ultrices rutrum risus. In sit amet nibh lobortis, tristique purus quis, faucibus metus. Sed id velit malesuada, lobortis eros nec, tempus risus. Quisque aliquet diam in ex consequat posuere. Duis dictum sagittis turpis, vel efficitur ex malesuada quis. Etiam lacus sem, molestie elementum laoreet non, fermentum ac nibh. Ut rhoncus nulla leo, eu suscipit ex blandit sit amet. Nulla facilisi. Aenean tincidunt ornare consectetur. In nec elit orci. Morbi ac condimentum neque. Morbi scelerisque feugiat laoreetm. Vestibulum vestibulum egestas rhoncus. Fusce pharetra ultrices magna eu posuere. Etiam id tortor lobortis, euismod sem eu, laoreet sapien. Praesent sed tellus id felis tincidunt ornare. Quisque placerat turpis commodo urna euismod, ut blandit magna sollicitudin. Quisque bibendum dolor sed odio vehicula, sed dictum augue facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque gravida bibendum nisl, vel dignissim lacus sodales quis. Sed fermentum dolor a ligula placerat sagittis. Curabitur blandit eros eu metus tristique sollicitudin. Cras tincidunt nibh turpis, at condimentum arcu fringilla et. Nulla gravida dapibus pulvinar. Nam interdum condimentum magna ut dignissim. Aenean elementum fringilla arcu, vitae luctus ex pharetra eu. Integer ultrices non purus quis varius. "
   , links =
      [ ("GitHub", "https://github.com/xast-platform/xastge-resource-center/", LucideIcon.githubIcon)
      , ("Telegram", "https://t.me/xast_programming", LucideIcon.sendIcon)
      ]
   }

type alias Icon msg = (List (Svg.Attribute msg) -> Html msg)

type alias AboutProps msg =
   { heading : String
   , description : String
   , links : List (String, String, Icon msg)
   }

aboutPanel : AboutProps msg -> Html msg
aboutPanel props = 
   container [ class "py-5 text-light" ]
      [ div [ class "about-surface border border-secondary rounded p-4 p-lg-5" ]
         [ h1 [ class "display-5 mb-3 icon-text-center" ]
            [ LucideIcon.infoIcon [ Svg.class "me-2" ]
            , text props.heading
            ]
         , p [ class "lead text-secondary" ] [ text props.description ]
         , div [ class "d-flex flex-wrap gap-2" ]
            ( props.links
               |> List.map (
                  \(name, link, icon) -> a [ class "btn btn-outline-info icon-text-center", href link, target "_blank", rel "noreferrer" ]
                     [ icon [ Svg.class "me-1" ]
                     , text name
                     ]
               )
            )
         ]
      ]