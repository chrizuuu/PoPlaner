#Jakie statystyki będą prowadzone przez aplikację?

    Podział na statystyki: dzienne, tyogodniowe, miesięczne oraz ogólne => z tym, ze obejmować będą maksymlanie ostatnie 365 dni.

    Dzienne:
        Tasks unfinished
        Tasks completed
       * Projects completed
        Daily Focused(h)
        Most Focused Hours
    Tygodniowe:
        Tasks unfinished
        Tasks completed
       * Projects completed       
        Weekly Focused(h)
        Most Focused Hours     
        Tabela z pokazaniem ile zadan w danym dniu zostało wykonanych a ile nie
    Ogólne(roczne):
        Tasks unfinished
        Tasks completed    
       * Projects completed
        Most Focused Hours
        Total Focused(h)

#Jak stworzyć komponent statystyk?
    1 Opcja:
        Zapisywanie danych w glibalnym stacie - uzycie React Redux
    2 Opcja: Zapisywanie statystyk w DB i operowanie na tych zapisanych liczbach