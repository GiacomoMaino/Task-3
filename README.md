# Task 3 application JEToP

## Descrizione
Realizzare un back-end che riceva, ad un endpoint custom, il nome di una città ed un giorno. Si dovrà
restituire un JSON contenente la previsione meteo di quella città relativa a quel giorno.

Il vostro back-end dovrà essere integrato con le API Open Weather Map (forecast 5 days). Esse vi
restituiranno le previsioni meteo per un massimo di 5 giorni, per cui non potranno essere soddisfatte
le richieste con giorni fuori da questo range.

Esempio di tecnologia utilizzabile: Node.js con Express.

## Documentatzione
Il backend specifica un endpoint come richiesto e esegue controlli sulla fattibilità della richiesta.
Se la richiesta è per un giorno prima della giornata corrente restituisce 410, mentre se è per un giorno successivo a 5 giorni a partire dal giorno della richiesta restituisce 404.

## Cambiamenti
### Problematica
L'API richiesta trasmette dati per intervalli di 3 ore, non giornalieri.
### Soluzione
Per questioni di tempo ho utilizzato una soluzione naïve che prevede di recuperare l'ultima previsione possibile per quel giorno.
Una soluzione più adeguata sarebbe quello di stabilire un ulteriore parametro "hour" che se impostato a -1 restituisca tutte le previsioni e altrimenti restituisca la previsione indicata.

### Problematica
L'API restituisce più dati del previsto.
### Soluzione
Il backend pulisce la response dell'API dai dati considerati inutili e inoltra al client la versione pulita.
