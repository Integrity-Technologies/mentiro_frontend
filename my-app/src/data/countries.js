const countries = [
  {
      "country_name": "Afghanistan",
      "country_short_name": "AF",
      "country_phone_code": 93,
      "phone_number_length": 9
  },
  {
      "country_name": "Albania",
      "country_short_name": "AL",
      "country_phone_code": 355,
      "phone_number_length": 8
  },
  {
      "country_name": "Algeria",
      "country_short_name": "DZ",
      "country_phone_code": 213,
      "phone_number_length": 9
  },
  {
      "country_name": "American Samoa",
      "country_short_name": "AS",
      "country_phone_code": 1684,
      "phone_number_length": 7
  },
  {
      "country_name": "Andorra",
      "country_short_name": "AD",
      "country_phone_code": 376,
      "phone_number_length": 6
  },
  {
      "country_name": "Angola",
      "country_short_name": "AO",
      "country_phone_code": 244,
      "phone_number_length": 9
  },
  {
      "country_name": "Anguilla",
      "country_short_name": "AI",
      "country_phone_code": 1264,
      "phone_number_length": 7
  },
  {
      "country_name": "Antarctica",
      "country_short_name": "AQ",
      "country_phone_code": 0,
      "phone_number_length": 0
  },
  {
      "country_name": "Antigua And Barbuda",
      "country_short_name": "AG",
      "country_phone_code": 1268,
      "phone_number_length": 7
  },
  {
      "country_name": "Argentina",
      "country_short_name": "AR",
      "country_phone_code": 54,
      "phone_number_length": 10
  },
  {
      "country_name": "Armenia",
      "country_short_name": "AM",
      "country_phone_code": 374,
      "phone_number_length": 8
  },
  {
      "country_name": "Aruba",
      "country_short_name": "AW",
      "country_phone_code": 297,
      "phone_number_length": 7
  },
  {
      "country_name": "Australia",
      "country_short_name": "AU",
      "country_phone_code": 61,
      "phone_number_length": 9
  },
  {
      "country_name": "Austria",
      "country_short_name": "AT",
      "country_phone_code": 43,
      "phone_number_length": 4
  },
  {
      "country_name": "Azerbaijan",
      "country_short_name": "AZ",
      "country_phone_code": 994,
      "phone_number_length": 9
  },
  {
      "country_name": "Bahamas The",
      "country_short_name": "BS",
      "country_phone_code": 1242,
      "phone_number_length": 7
  },
  {
      "country_name": "Bahrain",
      "country_short_name": "BH",
      "country_phone_code": 973,
      "phone_number_length": 8
  },
  {
      "country_name": "Bangladesh",
      "country_short_name": "BD",
      "country_phone_code": 880,
      "phone_number_length": 10
  },
  {
      "country_name": "Barbados",
      "country_short_name": "BB",
      "country_phone_code": 1246,
      "phone_number_length": 7
  },
  {
      "country_name": "Belarus",
      "country_short_name": "BY",
      "country_phone_code": 375,
      "phone_number_length": 9
  },
  {
      "country_name": "Belgium",
      "country_short_name": "BE",
      "country_phone_code": 32,
      "phone_number_length": 9
  },
  {
      "country_name": "Belize",
      "country_short_name": "BZ",
      "country_phone_code": 501,
      "phone_number_length": 7
  },
  {
      "country_name": "Benin",
      "country_short_name": "BJ",
      "country_phone_code": 229,
      "phone_number_length": 8
  },
  {
      "country_name": "Bermuda",
      "country_short_name": "BM",
      "country_phone_code": 1441,
      "phone_number_length": 7
  },
  {
      "country_name": "Bhutan",
      "country_short_name": "BT",
      "country_phone_code": 975,
      "phone_number_length": 8
  },
  {
      "country_name": "Bolivia",
      "country_short_name": "BO",
      "country_phone_code": 591,
      "phone_number_length": 8
  },
  {
      "country_name": "Bosnia and Herzegovina",
      "country_short_name": "BA",
      "country_phone_code": 387,
      "phone_number_length": 8
  },
  {
      "country_name": "Botswana",
      "country_short_name": "BW",
      "country_phone_code": 267,
      "phone_number_length": 7
  },
  {
      "country_name": "Bouvet Island",
      "country_short_name": "BV",
      "country_phone_code": 0,
      "phone_number_length": 0
  },
  {
      "country_name": "Brazil",
      "country_short_name": "BR",
      "country_phone_code": 55,
      "phone_number_length": 11
  },
  {
      "country_name": "British Indian Ocean Territory",
      "country_short_name": "IO",
      "country_phone_code": 246,
      "phone_number_length": 4
  },
  {
      "country_name": "Brunei",
      "country_short_name": "BN",
      "country_phone_code": 673,
      "phone_number_length": 7
  },
  {
      "country_name": "Bulgaria",
      "country_short_name": "BG",
      "country_phone_code": 359,
      "phone_number_length": 8
  },
  {
      "country_name": "Burkina Faso",
      "country_short_name": "BF",
      "country_phone_code": 226,
      "phone_number_length": 8
  },
  {
      "country_name": "Burundi",
      "country_short_name": "BI",
      "country_phone_code": 257,
      "phone_number_length": 8
  },
  {
      "country_name": "Cambodia",
      "country_short_name": "KH",
      "country_phone_code": 855,
      "phone_number_length": 9
  },
  {
      "country_name": "Cameroon",
      "country_short_name": "CM",
      "country_phone_code": 237,
      "phone_number_length": 9
  },
  {
      "country_name": "Canada",
      "country_short_name": "CA",
      "country_phone_code": 1,
      "phone_number_length": 10
  },
  {
      "country_name": "Cape Verde",
      "country_short_name": "CV",
      "country_phone_code": 238,
      "phone_number_length": 7
  },
  {
      "country_name": "Cayman Islands",
      "country_short_name": "KY",
      "country_phone_code": 1345,
      "phone_number_length": 7
  },
  {
    "country_name": "Central African Republic",
    "country_short_name": "CF",
    "country_phone_code": 236,
    "phone_number_length": 8
},
{
    "country_name": "Chad",
    "country_short_name": "TD",
    "country_phone_code": 235,
    "phone_number_length": 8
},
{
    "country_name": "Chile",
    "country_short_name": "CL",
    "country_phone_code": 56,
    "phone_number_length": 9
},
{
    "country_name": "China",
    "country_short_name": "CN",
    "country_phone_code": 86,
    "phone_number_length": 11
},
{
    "country_name": "Christmas Island",
    "country_short_name": "CX",
    "country_phone_code": 61,
    "phone_number_length": 9
},
{
    "country_name": "Cocos (Keeling) Islands",
    "country_short_name": "CC",
    "country_phone_code": 672,
    "phone_number_length": 7
},
{
    "country_name": "Colombia",
    "country_short_name": "CO",
    "country_phone_code": 57,
    "phone_number_length": 10
},
{
    "country_name": "Comoros",
    "country_short_name": "KM",
    "country_phone_code": 269,
    "phone_number_length": 7
},
{
    "country_name": "Cook Islands",
    "country_short_name": "CK",
    "country_phone_code": 682,
    "phone_number_length": 5
},
{
    "country_name": "Costa Rica",
    "country_short_name": "CR",
    "country_phone_code": 506,
    "phone_number_length": 8
},
{
    "country_name": "Cote D'Ivoire (Ivory Coast)",
    "country_short_name": "CI",
    "country_phone_code": 225,
    "phone_number_length": 8
},
{
    "country_name": "Croatia (Hrvatska)",
    "country_short_name": "HR",
    "country_phone_code": 385,
    "phone_number_length": 9
},
{
    "country_name": "Cuba",
    "country_short_name": "CU",
    "country_phone_code": 53,
    "phone_number_length": 8
},
{
    "country_name": "Cyprus",
    "country_short_name": "CY",
    "country_phone_code": 357,
    "phone_number_length": 8
},
{
    "country_name": "Czech Republic",
    "country_short_name": "CZ",
    "country_phone_code": 420,
    "phone_number_length": 9
},
{
    "country_name": "Democratic Republic Of The Congo",
    "country_short_name": "CD",
    "country_phone_code": 243,
    "phone_number_length": 9
},
{
    "country_name": "Denmark",
    "country_short_name": "DK",
    "country_phone_code": 45,
    "phone_number_length": 8
},
{
    "country_name": "Djibouti",
    "country_short_name": "DJ",
    "country_phone_code": 253,
    "phone_number_length": 6
},
{
    "country_name": "Dominica",
    "country_short_name": "DM",
    "country_phone_code": 1767,
    "phone_number_length": 7
},
{
    "country_name": "Dominican Republic",
    "country_short_name": "DO",
    "country_phone_code": 1809,
    "phone_number_length": 10
},
{
    "country_name": "East Timor",
    "country_short_name": "TP",
    "country_phone_code": 670,
    "phone_number_length": 7
},
{
    "country_name": "Ecuador",
    "country_short_name": "EC",
    "country_phone_code": 593,
    "phone_number_length": 9
},
{
    "country_name": "Egypt",
    "country_short_name": "EG",
    "country_phone_code": 20,
    "phone_number_length": 10
},
{
    "country_name": "El Salvador",
    "country_short_name": "SV",
    "country_phone_code": 503,
    "phone_number_length": 8
},
{
    "country_name": "Equatorial Guinea",
    "country_short_name": "GQ",
    "country_phone_code": 240,
    "phone_number_length": 9
},
{
    "country_name": "Eritrea",
    "country_short_name": "ER",
    "country_phone_code": 291,
    "phone_number_length": 8
},
{
    "country_name": "Estonia",
    "country_short_name": "EE",
    "country_phone_code": 372,
    "phone_number_length": 7
},
{
    "country_name": "Ethiopia",
    "country_short_name": "ET",
    "country_phone_code": 251,
    "phone_number_length": 9
},
{
    "country_name": "Falkland Islands",
    "country_short_name": "FK",
    "country_phone_code": 500,
    "phone_number_length": 4
},
{
    "country_name": "Faroe Islands",
    "country_short_name": "FO",
    "country_phone_code": 298,
    "phone_number_length": 6
},
{
    "country_name": "Fiji Islands",
    "country_short_name": "FJ",
    "country_phone_code": 679,
    "phone_number_length": 7
},
{
    "country_name": "Finland",
    "country_short_name": "FI",
    "country_phone_code": 358,
    "phone_number_length": 6
},
{
    "country_name": "France",
    "country_short_name": "FR",
    "country_phone_code": 33,
    "phone_number_length": 9
},
{
    "country_name": "French Guiana",
    "country_short_name": "GF",
    "country_phone_code": 594,
    "phone_number_length": 9
},
{
    "country_name": "French Polynesia",
    "country_short_name": "PF",
    "country_phone_code": 689,
    "phone_number_length": 6
},
{
    "country_name": "French Southern Territories",
    "country_short_name": "TF",
    "country_phone_code": 0,
    "phone_number_length": 0
},
{
    "country_name": "Gabon",
    "country_short_name": "GA",
    "country_phone_code": 241,
    "phone_number_length": 8
},
{
    "country_name": "Gambia The",
    "country_short_name": "GM",
    "country_phone_code": 220,
    "phone_number_length": 7
},
{
    "country_name": "Georgia",
    "country_short_name": "GE",
    "country_phone_code": 995,
    "phone_number_length": 9
},
{
    "country_name": "Germany",
    "country_short_name": "DE",
    "country_phone_code": 49,
    "phone_number_length": 11
},
{
    "country_name": "Ghana",
    "country_short_name": "GH",
    "country_phone_code": 233,
    "phone_number_length": 9
},
{
    "country_name": "Gibraltar",
    "country_short_name": "GI",
    "country_phone_code": 350,
    "phone_number_length": 5
},
{
    "country_name": "Greece",
    "country_short_name": "GR",
    "country_phone_code": 30,
    "phone_number_length": 10
},
{
    "country_name": "Greenland",
    "country_short_name": "GL",
    "country_phone_code": 299,
    "phone_number_length": 6
},
{
    "country_name": "Grenada",
    "country_short_name": "GD",
    "country_phone_code": 1473,
    "phone_number_length": 7
},
{
    "country_name": "Guadeloupe",
    "country_short_name": "GP",
    "country_phone_code": 590,
    "phone_number_length": 9
},
{
    "country_name": "Guam",
    "country_short_name": "GU",
    "country_phone_code": 1671,
    "phone_number_length": 7
},
{
    "country_name": "Guatemala",
    "country_short_name": "GT",
    "country_phone_code": 502,
    "phone_number_length": 8
},
{
    "country_name": "Guernsey and Alderney",
    "country_short_name": "XU",
    "country_phone_code": 44,
    "phone_number_length": 4
},
{
    "country_name": "Guinea",
    "country_short_name": "GN",
    "country_phone_code": 224,
    "phone_number_length": 9
},
{
    "country_name": "Guinea-Bissau",
    "country_short_name": "GW",
    "country_phone_code": 245,
    "phone_number_length": 7
},
{
    "country_name": "Guyana",
    "country_short_name": "GY",
    "country_phone_code": 592,
    "phone_number_length": 7
},
{
  "country_name": "Haiti",
  "country_short_name": "HT",
  "country_phone_code": 509,
  "phone_number_length": 8
},
{
  "country_name": "Heard and McDonald Islands",
  "country_short_name": "HM",
  "country_phone_code": 0,
  "phone_number_length": 0
},
{
  "country_name": "Honduras",
  "country_short_name": "HN",
  "country_phone_code": 504,
  "phone_number_length": 8
},
{
  "country_name": "Hong Kong S.A.R.",
  "country_short_name": "HK",
  "country_phone_code": 852,
  "phone_number_length": 8
},
{
  "country_name": "Hungary",
  "country_short_name": "HU",
  "country_phone_code": 36,
  "phone_number_length": 9
},
{
  "country_name": "Iceland",
  "country_short_name": "IS",
  "country_phone_code": 354,
  "phone_number_length": 7
},
{
  "country_name": "India",
  "country_short_name": "IN",
  "country_phone_code": 91,
  "phone_number_length": 10
},
{
  "country_name": "Indonesia",
  "country_short_name": "ID",
  "country_phone_code": 62,
  "phone_number_length": 10
},
{
  "country_name": "Iran",
  "country_short_name": "IR",
  "country_phone_code": 98,
  "phone_number_length": 11
},
{
  "country_name": "Iraq",
  "country_short_name": "IQ",
  "country_phone_code": 964,
  "phone_number_length": 8
},
{
  "country_name": "Ireland",
  "country_short_name": "IE",
  "country_phone_code": 353,
  "phone_number_length": 7
},
{
  "country_name": "Israel",
  "country_short_name": "IL",
  "country_phone_code": 972,
  "phone_number_length": 9
},
{
  "country_name": "Italy",
  "country_short_name": "IT",
  "country_phone_code": 39,
  "phone_number_length": 10
},
{
  "country_name": "Jamaica",
  "country_short_name": "JM",
  "country_phone_code": 1876,
  "phone_number_length": 7
},
{
  "country_name": "Japan",
  "country_short_name": "JP",
  "country_phone_code": 81,
  "phone_number_length": 10
},
{
  "country_name": "Jersey",
  "country_short_name": "XJ",
  "country_phone_code": 44,
  "phone_number_length": 4
},
{
  "country_name": "Jordan",
  "country_short_name": "JO",
  "country_phone_code": 962,
  "phone_number_length": 9
},
{
  "country_name": "Kazakhstan",
  "country_short_name": "KZ",
  "country_phone_code": 7,
  "phone_number_length": 11
},
{
  "country_name": "Kenya",
  "country_short_name": "KE",
  "country_phone_code": 254,
  "phone_number_length": 10
},
{
  "country_name": "Kiribati",
  "country_short_name": "KI",
  "country_phone_code": 686,
  "phone_number_length": 7
},
{
  "country_name": "Korea North",
  "country_short_name": "KP",
  "country_phone_code": 850,
  "phone_number_length": 8
},
{
  "country_name": "Korea South",
  "country_short_name": "KR",
  "country_phone_code": 82,
  "phone_number_length": 11
},
{
  "country_name": "Kuwait",
  "country_short_name": "KW",
  "country_phone_code": 965,
  "phone_number_length": 8
},
{
  "country_name": "Kyrgyzstan",
  "country_short_name": "KG",
  "country_phone_code": 996,
  "phone_number_length": 9
},
{
  "country_name": "Laos",
  "country_short_name": "LA",
  "country_phone_code": 856,
  "phone_number_length": 8
},
{
  "country_name": "Latvia",
  "country_short_name": "LV",
  "country_phone_code": 371,
  "phone_number_length": 8
},
{
  "country_name": "Lebanon",
  "country_short_name": "LB",
  "country_phone_code": 961,
  "phone_number_length": 8
},
{
  "country_name": "Lesotho",
  "country_short_name": "LS",
  "country_phone_code": 266,
  "phone_number_length": 8
},
{
  "country_name": "Liberia",
  "country_short_name": "LR",
  "country_phone_code": 231,
  "phone_number_length": 7
},
{
  "country_name": "Libya",
  "country_short_name": "LY",
  "country_phone_code": 218,
  "phone_number_length": 9
},
{
  "country_name": "Liechtenstein",
  "country_short_name": "LI",
  "country_phone_code": 423,
  "phone_number_length": 8
},
{
  "country_name": "Lithuania",
  "country_short_name": "LT",
  "country_phone_code": 370,
  "phone_number_length": 8
},
{
  "country_name": "Luxembourg",
  "country_short_name": "LU",
  "country_phone_code": 352,
  "phone_number_length": 6
},
{
  "country_name": "Macau S.A.R.",
  "country_short_name": "MO",
  "country_phone_code": 853,
  "phone_number_length": 8
},
{
  "country_name": "Macedonia",
  "country_short_name": "MK",
  "country_phone_code": 389,
  "phone_number_length": 8
},
{
  "country_name": "Madagascar",
  "country_short_name": "MG",
  "country_phone_code": 261,
  "phone_number_length": 9
},
{
  "country_name": "Malawi",
  "country_short_name": "MW",
  "country_phone_code": 265,
  "phone_number_length": 8
},
{
  "country_name": "Malaysia",
  "country_short_name": "MY",
  "country_phone_code": 60,
  "phone_number_length": 10
},
{
  "country_name": "Maldives",
  "country_short_name": "MV",
  "country_phone_code": 960,
  "phone_number_length": 7
},
{
  "country_name": "Mali",
  "country_short_name": "ML",
  "country_phone_code": 223,
  "phone_number_length": 8
},
{
  "country_name": "Malta",
  "country_short_name": "MT",
  "country_phone_code": 356,
  "phone_number_length": 8
},
{
  "country_name": "Man (Isle of)",
  "country_short_name": "XM",
  "country_phone_code": 44,
  "phone_number_length": 4
},
{
  "country_name": "Marshall Islands",
  "country_short_name": "MH",
  "country_phone_code": 692,
  "phone_number_length": 7
},
{
  "country_name": "Martinique",
  "country_short_name": "MQ",
  "country_phone_code": 596,
  "phone_number_length": 9
},
{
  "country_name": "Mauritania",
  "country_short_name": "MR",
  "country_phone_code": 222,
  "phone_number_length": 8
},
{
  "country_name": "Mauritius",
  "country_short_name": "MU",
  "country_phone_code": 230,
  "phone_number_length": 8
},
{
  "country_name": "Mayotte",
  "country_short_name": "YT",
  "country_phone_code": 269,
  "phone_number_length": 7
},
{
  "country_name": "Mexico",
  "country_short_name": "MX",
  "country_phone_code": 52,
  "phone_number_length": 10
},
{
  "country_name": "Micronesia",
  "country_short_name": "FM",
  "country_phone_code": 691,
  "phone_number_length": 7
},
{
  "country_name": "Moldova",
  "country_short_name": "MD",
  "country_phone_code": 373,
  "phone_number_length": 8
},
{
  "country_name": "Monaco",
  "country_short_name": "MC",
  "country_phone_code": 377,
  "phone_number_length": 6
},
{
  "country_name": "Mongolia",
  "country_short_name": "MN",
  "country_phone_code": 976,
  "phone_number_length": 8
},
{
  "country_name": "Montserrat",
  "country_short_name": "MS",
  "country_phone_code": 1664,
  "phone_number_length": 7
},
{
  "country_name": "Morocco",
  "country_short_name": "MA",
  "country_phone_code": 212,
  "phone_number_length": 10
},
{
  "country_name": "Mozambique",
  "country_short_name": "MZ",
  "country_phone_code": 258,
  "phone_number_length": 9
},
{
  "country_name": "Myanmar",
  "country_short_name": "MM",
  "country_phone_code": 95,
  "phone_number_length": 8
},
{
  "country_name": "Namibia",
  "country_short_name": "NA",
  "country_phone_code": 264,
  "phone_number_length": 9
},
{
  "country_name": "Nauru",
  "country_short_name": "NR",
  "country_phone_code": 674,
  "phone_number_length": 4
},
{
  "country_name": "Nepal",
  "country_short_name": "NP",
  "country_phone_code": 977,
  "phone_number_length": 10
},
{
  "country_name": "Netherlands Antilles",
  "country_short_name": "AN",
  "country_phone_code": 599,
  "phone_number_length": 7
},
{
  "country_name": "Netherlands The",
  "country_short_name": "NL",
  "country_phone_code": 31,
  "phone_number_length": 9
},
{
  "country_name": "New Caledonia",
  "country_short_name": "NC",
  "country_phone_code": 687,
  "phone_number_length": 6
},
{
  "country_name": "New Zealand",
  "country_short_name": "NZ",
  "country_phone_code": 64,
  "phone_number_length": 9
},
{
  "country_name": "Nicaragua",
  "country_short_name": "NI",
  "country_phone_code": 505,
  "phone_number_length": 8
},
{
  "country_name": "Niger",
  "country_short_name": "NE",
  "country_phone_code": 227,
  "phone_number_length": 8
},
{
  "country_name": "Nigeria",
  "country_short_name": "NG",
  "country_phone_code": 234,
  "phone_number_length": 10
},
{
  "country_name": "Niue",
  "country_short_name": "NU",
  "country_phone_code": 683,
  "phone_number_length": 4
},
{
  "country_name": "Norfolk Island",
  "country_short_name": "NF",
  "country_phone_code": 672,
  "phone_number_length": 4
},
{
  "country_name": "Northern Mariana Islands",
  "country_short_name": "MP",
  "country_phone_code": 1670,
  "phone_number_length": 7
},
{
  "country_name": "Norway",
  "country_short_name": "NO",
  "country_phone_code": 47,
  "phone_number_length": 8
},
{
  "country_name": "Oman",
  "country_short_name": "OM",
  "country_phone_code": 968,
  "phone_number_length": 8
},
{
  "country_name": "Pakistan",
  "country_short_name": "PK",
  "country_phone_code": 92,
  "phone_number_length": 10
},
{
  "country_name": "Palau",
  "country_short_name": "PW",
  "country_phone_code": 680,
  "phone_number_length": 7
},
{
  "country_name": "Palestinian Territory Occupied",
  "country_short_name": "PS",
  "country_phone_code": 970,
  "phone_number_length": 9
},
{
  "country_name": "Panama",
  "country_short_name": "PA",
  "country_phone_code": 507,
  "phone_number_length": 8
},
{
  "country_name": "Papua New Guinea",
  "country_short_name": "PG",
  "country_phone_code": 675,
  "phone_number_length": 7
},
{
  "country_name": "Paraguay",
  "country_short_name": "PY",
  "country_phone_code": 595,
  "phone_number_length": 9
},
{
  "country_name": "Peru",
  "country_short_name": "PE",
  "country_phone_code": 51,
  "phone_number_length": 9
},
{
  "country_name": "Philippines",
  "country_short_name": "PH",
  "country_phone_code": 63,
  "phone_number_length": 10
},
{
  "country_name": "Pitcairn Island",
  "country_short_name": "PN",
  "country_phone_code": 0,
  "phone_number_length": 0
},
{
  "country_name": "Poland",
  "country_short_name": "PL",
  "country_phone_code": 48,
  "phone_number_length": 9
},
{
  "country_name": "Portugal",
  "country_short_name": "PT",
  "country_phone_code": 351,
  "phone_number_length": 9
},
{
  "country_name": "Puerto Rico",
  "country_short_name": "PR",
  "country_phone_code": 1787,
  "phone_number_length": 7
},
{
  "country_name": "Qatar",
  "country_short_name": "QA",
  "country_phone_code": 974,
  "phone_number_length": 8
},
{
  "country_name": "Republic Of The Congo",
  "country_short_name": "CG",
  "country_phone_code": 242,
  "phone_number_length": 9
},
{
  "country_name": "Reunion",
  "country_short_name": "RE",
  "country_phone_code": 262,
  "phone_number_length": 9
},
{
  "country_name": "Romania",
  "country_short_name": "RO",
  "country_phone_code": 40,
  "phone_number_length": 10
},
{
  "country_name": "Russia",
  "country_short_name": "RU",
  "country_phone_code": 70,
  "phone_number_length": 11
},
{
  "country_name": "Rwanda",
  "country_short_name": "RW",
  "country_phone_code": 250,
  "phone_number_length": 9
},
{
  "country_name": "Saint Helena",
  "country_short_name": "SH",
  "country_phone_code": 290,
  "phone_number_length": 4
},
{
  "country_name": "Saint Kitts And Nevis",
  "country_short_name": "KN",
  "country_phone_code": 1869,
  "phone_number_length": 7
},
{
  "country_name": "Saint Lucia",
  "country_short_name": "LC",
  "country_phone_code": 1758,
  "phone_number_length": 7
},
{
  "country_name": "Saint Pierre and Miquelon",
  "country_short_name": "PM",
  "country_phone_code": 508,
  "phone_number_length": 6
},
{
  "country_name": "Saint Vincent And The Grenadines",
  "country_short_name": "VC",
  "country_phone_code": 1784,
  "phone_number_length": 7
},
{
  "country_name": "Samoa",
  "country_short_name": "WS",
  "country_phone_code": 684,
  "phone_number_length": 7
},
{
  "country_name": "San Marino",
  "country_short_name": "SM",
  "country_phone_code": 378,
  "phone_number_length": 7
},
{
  "country_name": "Sao Tome and Principe",
  "country_short_name": "ST",
  "country_phone_code": 239,
  "phone_number_length": 6
},
{
  "country_name": "Saudi Arabia",
  "country_short_name": "SA",
  "country_phone_code": 966,
  "phone_number_length": 9
},
{
  "country_name": "Senegal",
  "country_short_name": "SN",
  "country_phone_code": 221,
  "phone_number_length": 9
},
{
  "country_name": "Serbia",
  "country_short_name": "RS",
  "country_phone_code": 381,
  "phone_number_length": 9
},
{
  "country_name": "Seychelles",
  "country_short_name": "SC",
  "country_phone_code": 248,
  "phone_number_length": 4
},
{
  "country_name": "Sierra Leone",
  "country_short_name": "SL",
  "country_phone_code": 232,
  "phone_number_length": 8
},
{
  "country_name": "Singapore",
  "country_short_name": "SG",
  "country_phone_code": 65,
  "phone_number_length": 8
},
{
  "country_name": "Slovakia",
  "country_short_name": "SK",
  "country_phone_code": 421,
  "phone_number_length": 9
},
{
  "country_name": "Slovenia",
  "country_short_name": "SI",
  "country_phone_code": 386,
  "phone_number_length": 8
},
{
  "country_name": "Smaller Territories of the UK",
  "country_short_name": "XG",
  "country_phone_code": 44,
  "phone_number_length": 5
},
{
  "country_name": "Solomon Islands",
  "country_short_name": "SB",
  "country_phone_code": 677,
  "phone_number_length": 7
},
{
  "country_name": "Somalia",
  "country_short_name": "SO",
  "country_phone_code": 252,
  "phone_number_length": 7
},
{
  "country_name": "South Africa",
  "country_short_name": "ZA",
  "country_phone_code": 27,
  "phone_number_length": 10
},
{
  "country_name": "South Georgia",
  "country_short_name": "GS",
  "country_phone_code": 0,
  "phone_number_length": 0
},
{
  "country_name": "South Sudan",
  "country_short_name": "SS",
  "country_phone_code": 211,
  "phone_number_length": 9
},
{
  "country_name": "Spain",
  "country_short_name": "ES",
  "country_phone_code": 34,
  "phone_number_length": 9
},
{
  "country_name": "Sri Lanka",
  "country_short_name": "LK",
  "country_phone_code": 94,
  "phone_number_length": 10
},
{
  "country_name": "Sudan",
  "country_short_name": "SD",
  "country_phone_code": 249,
  "phone_number_length": 9
},
{
  "country_name": "Suriname",
  "country_short_name": "SR",
  "country_phone_code": 597,
  "phone_number_length": 7
},
{
  "country_name": "Svalbard And Jan Mayen Islands",
  "country_short_name": "SJ",
  "country_phone_code": 47,
  "phone_number_length": 8
},
{
  "country_name": "Swaziland",
  "country_short_name": "SZ",
  "country_phone_code": 268,
  "phone_number_length": 8
},
{
  "country_name": "Sweden",
  "country_short_name": "SE",
  "country_phone_code": 46,
  "phone_number_length": 10
},
{
  "country_name": "Switzerland",
  "country_short_name": "CH",
  "country_phone_code": 41,
  "phone_number_length": 10
},
{
  "country_name": "Syria",
  "country_short_name": "SY",
  "country_phone_code": 963,
  "phone_number_length": 9
},
{
  "country_name": "Taiwan",
  "country_short_name": "TW",
  "country_phone_code": 886,
  "phone_number_length": 10
},
{
  "country_name": "Tajikistan",
  "country_short_name": "TJ",
  "country_phone_code": 992,
  "phone_number_length": 9
},
{
  "country_name": "Tanzania",
  "country_short_name": "TZ",
  "country_phone_code": 255,
  "phone_number_length": 10
},
{
  "country_name": "Thailand",
  "country_short_name": "TH",
  "country_phone_code": 66,
  "phone_number_length": 9
},
{
  "country_name": "Togo",
  "country_short_name": "TG",
  "country_phone_code": 228,
  "phone_number_length": 8
},
{
  "country_name": "Tokelau",
  "country_short_name": "TK",
  "country_phone_code": 690,
  "phone_number_length": 4
},
{
  "country_name": "Tonga",
  "country_short_name": "TO",
  "country_phone_code": 676,
  "phone_number_length": 5
},
{
  "country_name": "Trinidad And Tobago",
  "country_short_name": "TT",
  "country_phone_code": 1868,
  "phone_number_length": 7
},
{
  "country_name": "Tunisia",
  "country_short_name": "TN",
  "country_phone_code": 216,
  "phone_number_length": 8
},
{
  "country_name": "Turkey",
  "country_short_name": "TR",
  "country_phone_code": 90,
  "phone_number_length": 10
},
{
  "country_name": "Turkmenistan",
  "country_short_name": "TM",
  "country_phone_code": 7370,
  "phone_number_length": 8
},
{
  "country_name": "Turks And Caicos Islands",
  "country_short_name": "TC",
  "country_phone_code": 1649,
  "phone_number_length": 7
},
{
  "country_name": "Tuvalu",
  "country_short_name": "TV",
  "country_phone_code": 688,
  "phone_number_length": 4
},
{
  "country_name": "Uganda",
  "country_short_name": "UG",
  "country_phone_code": 256,
  "phone_number_length": 9
},
{
  "country_name": "Ukraine",
  "country_short_name": "UA",
  "country_phone_code": 380,
  "phone_number_length": 9
},
{
  "country_name": "United Arab Emirates",
  "country_short_name": "AE",
  "country_phone_code": 971,
  "phone_number_length": 9
},
{
  "country_name": "United Kingdom",
  "country_short_name": "GB",
  "country_phone_code": 44,
  "phone_number_length": 5
},
{
  "country_name": "United States",
  "country_short_name": "US",
  "country_phone_code": 1,
  "phone_number_length": 10
},
{
  "country_name": "United States Minor Outlying Islands",
  "country_short_name": "UM",
  "country_phone_code": 1,
  "phone_number_length": 10
},
{
  "country_name": "Uruguay",
  "country_short_name": "UY",
  "country_phone_code": 598,
  "phone_number_length": 8
},
{
  "country_name": "Uzbekistan",
  "country_short_name": "UZ",
  "country_phone_code": 998,
  "phone_number_length": 9
},
{
  "country_name": "Vanuatu",
  "country_short_name": "VU",
  "country_phone_code": 678,
  "phone_number_length": 6
},
{
  "country_name": "Vatican City State (Holy See)",
  "country_short_name": "VA",
  "country_phone_code": 39,
  "phone_number_length": 9
},
{
  "country_name": "Venezuela",
  "country_short_name": "VE",
  "country_phone_code": 58,
  "phone_number_length": 11
},
{
  "country_name": "Vietnam",
  "country_short_name": "VN",
  "country_phone_code": 84,
  "phone_number_length": 9
},
{
  "country_name": "Virgin Islands (British)",
  "country_short_name": "VG",
  "country_phone_code": 1284,
  "phone_number_length": 7
},
{
  "country_name": "Virgin Islands (US)",
  "country_short_name": "VI",
  "country_phone_code": 1340,
  "phone_number_length": 7
},
{
  "country_name": "Wallis And Futuna Islands",
  "country_short_name": "WF",
  "country_phone_code": 681,
  "phone_number_length": 6
},
{
  "country_name": "Western Sahara",
  "country_short_name": "EH",
  "country_phone_code": 212,
  "phone_number_length": 9
},
{
  "country_name": "Yemen",
  "country_short_name": "YE",
  "country_phone_code": 967,
  "phone_number_length": 9
},
{
  "country_name": "Yugoslavia",
  "country_short_name": "YU",
  "country_phone_code": 38,
  "phone_number_length": 10
},
{
  "country_name": "Zambia",
  "country_short_name": "ZM",
  "country_phone_code": 260,
  "phone_number_length": 13
},
{
  "country_name": "Zimbabwe",
  "country_short_name": "ZW",
  "country_phone_code": 263,
  "phone_number_length": 9
}

]

export default countries;