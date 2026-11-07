/* ═══════════════════════════════════════════════════════════════
   FRÅGEBANK — Körkort Gatuvy
   ───────────────────────────────────────────────────────────────
   Kontrollerad mot lagtext:
     • Trafikförordningen (1998:1276), lydelse enligt SFS 2024:1265
     • Förordningen (2001:651) om vägtrafikdefinitioner, SFS 2020:1095
     • Vägmärkesförordningen (2007:90)
     • Transportstyrelsens beskrivningar av anvisningsmärken

   TVÅ SEPARATA KONTROLLER — blanda inte ihop dem:

     kallaKontrollerad = true
       Paragrafhänvisningen är läst i källtexten och stämmer.

     granskad = true
       En människa har läst frågan och godkänt formulering och
       pedagogik. Ingen fråga är ännu granskad. Använd Granska-läget
       i appen för att gå igenom dem.

   Fält: id, kategori, typ, svarighet, fraga, alternativ, ratt,
         forklaring, regel, kallaKontrollerad, granskad
   ═══════════════════════════════════════════════════════════════ */

window.FRAGEBANK = [

/* ── Väjningsplikt ─────────────────────────────────────────── */
{
  id:"vajning-001", kategori:"vajning", typ:"flerval", svarighet:1,
  fraga:"Du närmar dig en korsning. Det finns inga vägmärken och inga vägmarkeringar. En bil kommer samtidigt från höger. Vem ska lämna företräde?",
  alternativ:["Bilen från höger","Du","Den som kom fram först","Den som kör på den bredare vägen"],
  ratt:1,
  forklaring:"Du ska lämna företräde. Lagtexten säger att när två fordons kurser skär varandra har föraren väjningsplikt mot fordonet som närmar sig från höger. Regeln handlar alltså om korsande kurser, inte bara om korsningar. Undantagen finns i 21–23 §§: huvudled, utfarter och cirkulationsplatser. Kommer det ett vägmärke som säger något annat, gäller märket före regeln.",
  regel:"Trafikförordningen 3 kap. 18 §. Undantag: 21–23 §§. Märkens företräde: 2 kap. 2 §",
  kallaKontrollerad:true, granskad:false
},
{
  id:"vajning-002", kategori:"vajning", typ:"flerval", svarighet:1,
  fraga:"Du kör ut på gatan från en parkeringsplats. Vad gäller?",
  alternativ:["Högerregeln gäller som vanligt","Du har väjningsplikt mot all trafik på gatan","Du har företräde om du redan börjat köra ut","Du har företräde mot fordon från vänster"],
  ratt:1,
  forklaring:"Du har väjningsplikt mot varje fordon vars kurs skär din egen. Lagen räknar upp var: parkeringsplats, fastighet, bensinstation eller liknande område, stig eller ägoväg, samt cykelbana, gågata, gångfartsområde och cykelgata — och efter att du korsat en gång- eller cykelbana. Du har dessutom väjningsplikt mot gående när du kör ut från en fastighetsutfart. Högerregeln gäller inte här.",
  regel:"Trafikförordningen 3 kap. 21 § andra stycket. Gående: 3 kap. 58 § första stycket",
  kallaKontrollerad:true, granskad:false
},
{
  id:"vajning-003", kategori:"vajning", typ:"santfalskt", svarighet:2,
  fraga:"I en cirkulationsplats ska du blinka höger när du kör in i cirkulationen.",
  alternativ:["Sant","Falskt"], ratt:1,
  forklaring:"Falskt. Du blinkar höger först när du ska köra ut. Blinkersen talar om vad du gör härnäst — blinkar du höger på väg in tror andra att du svänger av direkt. Två saker till: väjningsplikten vid infart står direkt i lagen och beror inte på att det finns en skylt. Och inne i cirkulationen kör du motsols runt rondellen.",
  regel:"Väjningsplikt: Trafikförordningen 3 kap. 22 §. Körriktning: 3 kap. 13 §. Tecken: 3 kap. 65 §",
  kallaKontrollerad:true, granskad:false
},
{
  id:"vajning-005", kategori:"vajning", typ:"flerval", svarighet:1,
  fraga:"Du ska köra in i en cirkulationsplats. En bil är redan inne i cirkulationen. Vem har företräde?",
  alternativ:["Du, om du hunnit fram till infarten först","Bilen som redan är i cirkulationen","Den som kommer från höger","Den som ska längst i cirkulationen"],
  ratt:1,
  forklaring:"Bilen som redan är inne. Lagen säger rakt ut att den som kör in i en cirkulationsplats har väjningsplikt mot varje fordon som befinner sig i cirkulationen. Detta gäller oavsett om det står ett väjningspliktsmärke vid infarten eller inte — märket är bara en påminnelse om en regel som redan finns. Högerregeln gäller alltså inte i en cirkulationsplats.",
  regel:"Trafikförordningen 3 kap. 22 §, som är ett uttryckligt undantag från 3 kap. 18 §",
  kallaKontrollerad:true, granskad:false
},
{
  id:"vajning-004", kategori:"vajning", typ:"flerval", svarighet:2,
  fraga:"Trafiksignalen i korsningen är helt släckt och fungerar inte. Hur ska du göra?",
  alternativ:["Kör försiktigt, alla har lika stort ansvar","Följ vägmärkena, och gäller inga märken så gäller högerregeln","Stanna alltid helt och vänta på din tur","Den som kommer från den större vägen har alltid företräde"],
  ratt:1,
  forklaring:"En släckt signal ger ingen anvisning, så du faller tillbaka på det som annars gäller: först vägmärkena, sedan högerregeln. Observera att detta är en slutsats av två regler — det finns ingen egen paragraf om trasiga signaler. Räkna med att andra gör fel här.",
  regel:"Följer av Trafikförordningen 2 kap. 2 § och 3 kap. 18 §. Ingen uttrycklig paragraf finns om signaler ur funktion",
  kallaKontrollerad:false, granskad:false
},

/* ── Vägmärken ─────────────────────────────────────────────── */
{
  id:"skyltar-001", kategori:"skyltar", typ:"santfalskt", svarighet:1,
  fraga:"Vid märket Väjningsplikt (triangel med spetsen nedåt) måste du alltid stanna helt.",
  alternativ:["Sant","Falskt"], ratt:1,
  forklaring:"Falskt. Lagen säger att den som har väjningsplikt tydligt ska visa sin avsikt att väja genom att i god tid sänka hastigheten eller stanna. Är vägen fri räcker det att sakta ner. Du får köra vidare bara om det inte uppstår fara eller hinder, med hänsyn till var andra befinner sig, hur långt bort de är och hur fort de kör.",
  regel:"Trafikförordningen 3 kap. 5 §. Märket B1 i Vägmärkesförordningen (2007:90)",
  kallaKontrollerad:true, granskad:false
},
{
  id:"skyltar-002", kategori:"skyltar", typ:"santfalskt", svarighet:1,
  fraga:"Vid ett stoppmärke får du rulla vidare utan att stanna om du ser att vägen är helt tom.",
  alternativ:["Sant","Falskt"], ratt:1,
  forklaring:"Falskt. Vid stopplikt ska du stanna vid stopplinjen. Saknas stopplinje ska du stanna innan du kör in på den korsande vägen. Detta gäller även om vägen är tom. Att rulla sakta förbi räknas inte som att ha stannat.",
  regel:"Trafikförordningen 3 kap. 19 §. Märket B2 i Vägmärkesförordningen (2007:90)",
  kallaKontrollerad:true, granskad:false
},
{
  id:"skyltar-003", kategori:"skyltar", typ:"flerval", svarighet:1,
  fraga:"Du kör på en väg med gula romber (Huvudled). Vad innebär det?",
  alternativ:["Hastigheten är alltid 70 km/h","Du har företräde mot korsande trafik","Högerregeln gäller extra strikt","Du har väjningsplikt i varje korsning"],
  ratt:1,
  forklaring:"Du har företräde. Den som kör in på en huvudled från en annan väg har väjningsplikt mot trafiken på huvudleden. Två saker till: parkeringsförbud på huvudled står direkt i lagen, så du behöver inte leta efter ett P-förbudsmärke. Och märket säger ingenting om hastigheten.",
  regel:"Väjningsplikt: Trafikförordningen 3 kap. 21 § första stycket. Parkeringsförbud: 3 kap. 55 § första stycket 3",
  kallaKontrollerad:true, granskad:false
},
{
  id:"skyltar-004", kategori:"skyltar", typ:"flerval", svarighet:1,
  fraga:"Vad betyder ett vägmärke som är en triangel med röd ram och gul botten?",
  alternativ:["Ett förbud","En varning för något framåt","Ett påbud du måste följa","En upplysning om en tjänst"],
  ratt:1,
  forklaring:"Ett varningsmärke. Lagtexten säger att varningsmärken varnar för en fara och upplyser om farans art — men de säger inte vad du ska göra. Det är upp till dig att sänka farten och vara beredd. Märket sitter på det avstånd från faran som gör det mest effektivt, både dag och natt. Sträcker sig faran över en längre sträcka anges längden på en tilläggstavla.",
  regel:"Vägmärkesförordningen (2007:90), avsnittet om varningsmärken, A-serien",
  kallaKontrollerad:true, granskad:false
},
{
  id:"skyltar-005", kategori:"skyltar", typ:"flerval", svarighet:2,
  fraga:"Ett runt blått märke med en vit pil rakt fram. Vad betyder det?",
  alternativ:["Rekommenderad färdriktning","Du måste köra i pilens riktning","Enkelriktad gata","Parkering tillåten framåt"],
  ratt:1,
  forklaring:"Detta är märke D1, Påbjuden körriktning. Lagtexten säger att fordon endast får föras i pilens riktning — det är alltså ett krav, inte en rekommendation. Ett påbudsmärke som anger att ett visst slag av trafik är påbjuden innebär samtidigt förbud mot annan trafik. Minnesregel: rund och röd = förbud, rund och blå = påbud, blå fyrkant = upplysning.",
  regel:"Vägmärkesförordningen (2007:90), märke D1 Påbjuden körriktning",
  kallaKontrollerad:true, granskad:false
},

/* ── Hastighet ─────────────────────────────────────────────── */
{
  id:"hastighet-001", kategori:"hastighet", typ:"flerval", svarighet:1,
  fraga:"Du kör inom tättbebyggt område. Det finns inget hastighetsmärke. Vilken är högsta tillåtna hastighet?",
  alternativ:["30 km/h","40 km/h","50 km/h","60 km/h"],
  ratt:2,
  forklaring:"50 km/h. Lagtexten säger rakt ut att fordon inte får föras fortare än 50 inom tättbebyggt område. Men kommunen får sänka till 30 eller 40 för ett område eller en del av ett område, och Stockholm har gjort det på många gator — leta alltid efter märken.",
  regel:"Trafikförordningen 3 kap. 17 § första och andra styckena",
  kallaKontrollerad:true, granskad:false
},
{
  id:"hastighet-002", kategori:"hastighet", typ:"flerval", svarighet:1,
  fraga:"Du passerar märket som visar att tättbebyggt område upphör. Inget hastighetsmärke syns. Vad gäller nu?",
  alternativ:["50 km/h","70 km/h","90 km/h","Samma som innan tills nytt märke"],
  ratt:1,
  forklaring:"70 km/h. Lagen kallar detta bashastighet. Trafikverket kan höja till 80, 90, 100 eller 110 på en viss väg, och gränsen kan också vara skyltad lägre — så du kan inte bara anta 70 utan att titta.",
  regel:"Trafikförordningen 3 kap. 17 § tredje och fjärde styckena",
  kallaKontrollerad:true, granskad:false
},
{
  id:"hastighet-003", kategori:"hastighet", typ:"santfalskt", svarighet:2,
  fraga:"Hastighetsgränsen är den fart du ska hålla när förhållandena tillåter det.",
  alternativ:["Sant","Falskt"], ratt:1,
  forklaring:"Falskt. Gränsen är ett tak, inte ett mål. Lagen kräver att farten anpassas till vad trafiksäkerheten kräver — väg, väder, sikt, fordonets skick och belastning. Den sätter också en hård regel: du får aldrig köra fortare än att du kan stanna på den del av vägen du kan överblicka, och framför varje hinder som går att förutse.",
  regel:"Trafikförordningen 3 kap. 14 §. Se även 3 kap. 15 § om platser som kräver låg fart",
  kallaKontrollerad:true, granskad:false
},
{
  id:"hastighet-004", kategori:"hastighet", typ:"flerval", svarighet:2,
  fraga:"Du kör in i ett gångfartsområde. Vad gäller?",
  alternativ:["30 km/h och vanliga parkeringsregler","Högst gångfart, väjningsplikt mot gående, och parkering endast på anordnade platser","50 km/h som vanligt","Fri fart, men var försiktig"],
  ratt:1,
  forklaring:"Tre regler gäller samtidigt i ett gångfartsområde: du får inte köra fortare än gångfart, du har väjningsplikt mot gående, och du får bara parkera på särskilt anordnade parkeringsplatser. Parkeringsregeln glöms ofta bort. När du kör ut från området har du dessutom väjningsplikt mot all trafik, precis som från en utfart.",
  regel:"Trafikförordningen 8 kap. 1 § första stycket. Utfartsregeln: 3 kap. 21 § andra stycket 3",
  kallaKontrollerad:true, granskad:false
},
{
  id:"hastighet-005", kategori:"hastighet", typ:"flerval", svarighet:2,
  fraga:"Var måste du hålla tillräckligt låg hastighet, även om skylten tillåter mer?",
  alternativ:["Bara vid skolor","Bara när det är halt","Vid bland annat backkrön, skarpa kurvor, övergångsställen och nära barn","Bara inom tättbebyggt område"],
  ratt:2,
  forklaring:"Lagen listar femton situationer där du måste hålla tillräckligt låg fart. Bland dem: inom tättbebyggt område, vid nedsatt sikt, vid övergångsställen, där korsande trafik kan förekomma, i skarpa kurvor, vid backkrön, vid halt väglag, när du närmar dig en buss som stannat för av- och påstigning, och när du närmar dig barn vid vägen. Detta gäller utöver hastighetsgränsen.",
  regel:"Trafikförordningen 3 kap. 15 §",
  kallaKontrollerad:true, granskad:false
},

/* ── Oskyddade trafikanter ─────────────────────────────────── */
{
  id:"oskyddade-001", kategori:"oskyddade", typ:"flerval", svarighet:1,
  fraga:"Du närmar dig ett obevakat övergångsställe. En person står vid kanten och är tydligt på väg att gå över. Vad gäller?",
  alternativ:["Du har företräde eftersom personen inte gått ut än","Du har väjningsplikt och ska låta personen gå","Du kan köra om du blinkar med ljuset","Bara om personen räcker upp handen"],
  ratt:1,
  forklaring:"Du har väjningsplikt. Lagtexten säger uttryckligen att detta gäller gående som gått ut på eller just ska gå ut på övergångsstället — alltså även innan foten är på vägen. Du ska hålla låg fart när du närmar dig och du får inte köra om strax före eller på ett obevakat övergångsställe. 'Obevakat' betyder att trafiken inte regleras av signal eller polis.",
  regel:"Trafikförordningen 3 kap. 61 § första stycket. Låg fart: 3 kap. 15 § p. 3. Omkörningsförbud: 3 kap. 40 §",
  kallaKontrollerad:true, granskad:false
},
{
  id:"oskyddade-002", kategori:"oskyddade", typ:"flerval", svarighet:2,
  fraga:"Du ska svänga höger i en korsning. En cyklist kommer rakt fram i cykelbanan bredvid dig. Vad gäller?",
  alternativ:["Cyklisten har väjningsplikt mot bilar","Du har väjningsplikt mot cyklisten","Den som kommer först har företräde","Du får svänga om du blinkar i god tid"],
  ratt:1,
  forklaring:"Cyklande och förare av moped klass II ska lämnas företräde av andra fordonsförare på cykelbanor. Du har dessutom väjningsplikt när du kommer in på en väg efter att ha korsat en gång- eller cykelbana. Detta är en av de vanligaste olyckssituationerna i stan — titta i höger backspegel och över axeln.",
  regel:"Trafikförordningen 3 kap. 59 § första stycket och 3 kap. 21 § andra stycket 4",
  kallaKontrollerad:true, granskad:false
},
{
  id:"oskyddade-003", kategori:"oskyddade", typ:"santfalskt", svarighet:3,
  fraga:"En cykelpassage och en cykelöverfart är samma sak.",
  alternativ:["Sant","Falskt"], ratt:1,
  forklaring:"Falskt. En cykelöverfart anges med både vägmarkering OCH vägmärke, och trafikmiljön ska vara byggd så att fordon inte kan köra fortare än 30 km/h där — därför är de ofta upphöjda. Vid en cykelöverfart har du väjningsplikt. En cykelpassage anges bara med vägmarkering. Där har du ingen väjningsplikt, men du ska anpassa hastigheten så att det inte uppstår fara. Har du precis svängt i en korsning eller kör ut ur en cirkulationsplats ska du dock köra långsamt och släppa fram cyklisterna även vid en cykelpassage.",
  regel:"Definitioner: förordningen (2001:651) om vägtrafikdefinitioner 2 §. Cykelöverfart: Trafikförordningen 3 kap. 61 a §. Cykelpassage: 3 kap. 61 § andra och tredje styckena",
  kallaKontrollerad:true, granskad:false
},
{
  id:"oskyddade-004", kategori:"oskyddade", typ:"flerval", svarighet:2,
  fraga:"Du kör på en 50-gata i Söderort. En buss vid hållplatsen blinkar för att köra ut. Vad gäller?",
  alternativ:["Bussen har väjningsplikt mot dig","Du ska sakta ner och släppa ut bussen, och stanna om det behövs","Ni har lika stort ansvar","Bara om bussen redan börjat rulla"],
  ratt:1,
  forklaring:"Där högsta tillåtna hastighet är 50 km/h eller lägre ska du sakta ner och ge bussen möjlighet att lämna hållplatsen — och stanna om det behövs. Regeln gäller alltså inte på vägar med högre gräns. Bussföraren ska å sin sida vara särskilt försiktig. Tänk också på att om en buss stannat vid en hållplats utan refug och du ska passera till höger om den, måste du stanna och släppa fram passagerarna.",
  regel:"Trafikförordningen 3 kap. 45 §. Passagerare vid hållplats utan refug: 3 kap. 58 § fjärde stycket",
  kallaKontrollerad:true, granskad:false
},

/* ── Placering och körsätt ─────────────────────────────────── */
{
  id:"placering-001", kategori:"placering", typ:"flerval", svarighet:1,
  fraga:"Du ska svänga vänster från en vanlig tvåfilig gata. Var placerar du bilen innan svängen?",
  alternativ:["Nära högerkanten","Nära mittlinjen","Mitt i körfältet","Spelar ingen roll, bara du blinkar"],
  ratt:1,
  forklaring:"Lagtexten säger att fordonet vid vänstersväng ska föras så nära körbanans mitt som möjligt — och på en enkelriktad gata så nära vänsterkanten som möjligt. Vid högersväng gäller motsatsen: så nära högra kanten som lämpligen kan ske. Svängen ska dessutom göras så att du hamnar till höger på den körbana du kör in på.",
  regel:"Trafikförordningen 3 kap. 26 § andra, tredje och fjärde styckena",
  kallaKontrollerad:true, granskad:false
},
{
  id:"placering-002", kategori:"placering", typ:"santfalskt", svarighet:2,
  fraga:"Omkörning ska som huvudregel ske till vänster.",
  alternativ:["Sant","Falskt"], ratt:0,
  forklaring:"Sant, men med viktiga undantag. Omkörning ska ske till HÖGER när föraren framför svänger vänster eller tydligt förbereder en vänstersväng. Och på väg där gränsen är högst 70 km/h med minst två markerade körfält åt samma håll får du välja körfält efter den fortsatta färden — då räknas det inte som omkörning att passera. Detsamma gäller vid tät kö i alla körfält.",
  regel:"Trafikförordningen 3 kap. 31 § första stycket. Undantag: 3 kap. 7 § fjärde stycket och 3 kap. 41 §",
  kallaKontrollerad:true, granskad:false
},
{
  id:"placering-003", kategori:"placering", typ:"flerval", svarighet:2,
  fraga:"Hur långt före en sväng bör du ge tecken med blinkers?",
  alternativ:["Precis när du börjar svänga","I god tid, så andra hinner uppfatta det","Först när du är helt säker på att ingen ser dig","Blinkers behövs inte om ingen är i närheten"],
  ratt:1,
  forklaring:"Lagen säger att tecken ska ges i god tid innan manövern, vara väl synligt och otvetydigt, och upphöra så snart manövern är avslutad. Men det viktigaste står i nästa paragraf: även om du gett tecken är du skyldig att försäkra dig om att manövern kan göras utan fara eller onödigt hinder. Blinkersen ger dig alltså ingen rätt att köra.",
  regel:"Trafikförordningen 3 kap. 65 § tredje stycket och 3 kap. 66 §",
  kallaKontrollerad:true, granskad:false
},
{
  id:"placering-004", kategori:"placering", typ:"flerval", svarighet:2,
  fraga:"Får du köra om strax före en vägkorsning?",
  alternativ:["Ja, alltid om sikten är fri","Nej, utom i vissa undantagsfall","Ja, om du blinkar","Nej, aldrig under några omständigheter"],
  ratt:1,
  forklaring:"Huvudregeln är nej. Undantagen är tre: när omkörningen sker till höger, när trafiken i korsningen styrs av polis eller trafiksignaler, eller när det framgår att förarna på den korsande vägen har väjningsplikt eller stopplikt. Tvåhjuliga fordon utan sidvagn får dock köras om. Vid skymd sikt i backkrön eller kurva gäller ännu strängare regler.",
  regel:"Trafikförordningen 3 kap. 39 §",
  kallaKontrollerad:true, granskad:false
},
{
  id:"placering-005", kategori:"placering", typ:"santfalskt", svarighet:1,
  fraga:"Avståndet till bilen framför ska anpassas så att du hinner stanna om den bromsar.",
  alternativ:["Sant","Falskt"], ratt:0,
  forklaring:"Sant. Lagen säger att avståndet ska anpassas så att det inte finns risk för påkörning om fordonet framför saktar in eller stannar. Men det finns ett andra skäl som många missar: avståndet ska också anpassas så att andra trafikanters omkörning underlättas. Ligger du för tätt bakom blir det svårt för någon annan att köra om er båda.",
  regel:"Trafikförordningen 3 kap. 2 §",
  kallaKontrollerad:true, granskad:false
},

/* ── Stannande och parkering ───────────────────────────────── */
{
  id:"parkering-001", kategori:"parkering", typ:"flerval", svarighet:2,
  fraga:"Hur nära ett övergångsställe får du stanna eller parkera?",
  alternativ:["Direkt före, om du inte skymmer","Inte inom 10 meter före","Inte inom 5 meter före","Inte inom 20 meter före"],
  ratt:1,
  forklaring:"Tio meter, och förbudet gäller både stannande och parkering. Samma tiometersgräns gäller före en cykelpassage, en cykelöverfart och en korsande cykelbana eller gångbana — och i en korsning räknat från den korsande körbanans närmaste ytterkant. Skälet är sikten: en parkerad bil gör att du inte ser gående som är på väg ut, och de ser inte dig.",
  regel:"Trafikförordningen 3 kap. 53 § första stycket punkterna 1, 2 och 3",
  kallaKontrollerad:true, granskad:false
},
{
  id:"parkering-002", kategori:"parkering", typ:"santfalskt", svarighet:2,
  fraga:"Du får parkera på en huvudled om det inte står något förbudsmärke.",
  alternativ:["Sant","Falskt"], ratt:1,
  forklaring:"Falskt. Parkeringsförbud på huvudled står direkt i lagen och behöver inte skyltas. Notera att paragrafen bara förbjuder parkering — att stanna kort för av- och påstigning är alltså tillåtet, så länge det inte skapar fara eller hinder. En klassisk fälla: många letar efter ett P-förbudsmärke som aldrig kommer.",
  regel:"Trafikförordningen 3 kap. 55 § första stycket 3. Allmänt förbud mot farligt stannande: 3 kap. 47 §",
  kallaKontrollerad:true, granskad:false
},
{
  id:"parkering-003", kategori:"parkering", typ:"flerval", svarighet:1,
  fraga:"Vad är skillnaden mellan att stanna och att parkera?",
  alternativ:["Ingen, orden betyder samma sak","Parkering är uppställning av annan anledning än trafikförhållandena, fara, av- och påstigning eller lastning","Stannande är under 5 minuter, parkering är längre","Parkering kräver alltid att motorn är avstängd"],
  ratt:1,
  forklaring:"Definitionen bygger på ORSAKEN, inte på tiden. Parkering är uppställning av ett fordon, med eller utan förare, av någon annan anledning än att trafikförhållandena kräver det, att undvika fara, eller av- och påstigning eller lastning av gods. Stannande är allt annat stillastående som inte är parkering. Domstol har bedömt elva minuters uppställning för påstigning som parkering — tiden i sig avgör alltså ingenting, men lång tid gör det svårt att hävda att det var av- och påstigning.",
  regel:"Förordningen (2001:651) om vägtrafikdefinitioner 2 §, som Trafikförordningen hänvisar till i 1 kap. 3 § andra stycket. Rättsfall: RH 2004:53",
  kallaKontrollerad:true, granskad:false
},
{
  id:"parkering-004", kategori:"parkering", typ:"flerval", svarighet:2,
  fraga:"Får du parkera framför infarten till någon annans fastighet?",
  alternativ:["Ja, om du bara står en kort stund","Nej, inte om trafik till eller från fastigheten väsentligen försvåras","Ja, om det inte finns något förbudsmärke","Ja, om infarten ser oanvänd ut"],
  ratt:1,
  forklaring:"Nej. Lagen förbjuder parkering framför infarten till en fastighet, eller så att fordonstrafik till eller från fastigheten väsentligen försvåras. Detta gäller utan att det behöver skyltas. Andra parkeringsförbud i samma paragraf: inom 30 meter från en plankorsning, på huvudled, bredvid ett annat parkerat fordon, och på en utmärkt mötesplats.",
  regel:"Trafikförordningen 3 kap. 55 § första stycket 2",
  kallaKontrollerad:true, granskad:false
},
{
  id:"parkering-005", kategori:"parkering", typ:"santfalskt", svarighet:1,
  fraga:"Du får stanna bilen på en gångbana så länge du sitter kvar i den.",
  alternativ:["Sant","Falskt"], ratt:1,
  forklaring:"Falskt. På en gång- eller cykelbana får andra fordon än tvåhjuliga cyklar och tvåhjuliga mopeder klass II varken stannas eller parkeras. Att du sitter kvar spelar ingen roll — förbudet gäller stannande, inte bara parkering. Inom tättbebyggt område får du inte heller stanna eller parkera på allmän plats som är terräng.",
  regel:"Trafikförordningen 3 kap. 48 § första och andra styckena",
  kallaKontrollerad:true, granskad:false
}

];
