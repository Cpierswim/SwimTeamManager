import enum

class UserTypeEnum(enum.Enum):
    PARENT = 1
    COACH = 2

class GenderEnum(enum.Enum):
    FEMALE = 1
    MALE = 2

class StateEnum(enum.Enum):
    Alabama = "AL"
    Alaska = "AK"
    Arizona = "AZ"
    Arkansas = "AR"
    California = "CA"
    Colorado = "CO"
    Connecticut = "CT"
    Delaware = "DE"
    Florida = "FL"
    Georgia = "GA"
    Hawaii = "HI"
    Idaho = "ID"
    Illinois = "IL"
    Indiana = "IN"
    Iowa = "IA"
    Kansas = "KS"
    Kentucky = "KY"
    Louisiana = "LA"
    Maine = "ME"
    Maryland = "MD"
    Massachusetts = "MA"
    Michigan = "MI"
    Minnesota = "MN"
    Mississippi = "MS"
    Missouri = "MO"
    Montana = "MT"
    Nebraska = "NE"
    Nevada = "NV"
    New_Hampshire = "NH"
    New_Jersey = "NJ"
    New_Mexico = "NM"
    New_York = "NY"
    North_Carolina = "NC"
    North_Dakota = "ND"
    Ohio = "OH"
    Oklahoma = "OK"
    Oregon = "OR"
    Pennsylvania = "PA"
    Rhode_Island = "RI"
    South_Carolina = "SC"
    South_Dakota = "SD"
    Tennessee = "TN"
    Texas = "TX"
    Utah = "UT"
    Vermont = "VT"
    Virginia = "VA"
    Washington ="WA"
    West_Virginia = "WV"
    Wisconsin = "WI"
    Wyoming = "WY"
    District_of_Columbia = "DC"
    Guam = "GU"
    Northern_Mariana_Islands = "MP"
    Trust_Territories = "TT"
    Virgin_Islands = "VI"

class StrokeEnum(enum.Enum):
    FREE = 1
    BACK = 2
    BREAST = 3
    FLY = 4
    IM = 5

class EventTypeEnum(enum.Enum):
    INDIVIDUAL = 1
    RELAY = 2