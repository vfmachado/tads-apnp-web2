# VOTING API

## USE CASES

    1. REGISTER A NEW POLL (ENQUETE)
    2. ADD A VOTE TO A POLL
    3. CHECK POLL
        PARTIAL: ALLOW PARTIAL RESULTS
        BLIND: JUST SHOW RESULTS IF THE POLL HAS ENDED

## ENTTITIES

    1. POLL
        ID
        NAME
        DESCRIPTION
        INITIAL DATE
        FINAL DATE
        BLIND

        OPTIONS [
            NAME
            DESCRIPTION
            QUANTITY
        ]

        CPFS []


    2. VOTE **

        ID **
        ID POLL
        OPTION
        CPF
        TIMESTAMP