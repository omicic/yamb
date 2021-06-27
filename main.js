var igrac = {
    name: "Olivera",
    yamb: {
        premadole: [0, 0, 0, 0, 0, 0],
        slobodnakolona: [0, 0, 0, 0, 0, 0],
        premagore: [0, 0, 0, 0, 0, 0],
    }
}

let li_slobodna_kolona_unos = document.querySelector('.slobodnakolona').querySelector('ul'); //.querySelectorAll('li [data-id*="unos"]');

console.log(li_slobodna_kolona_unos);


let tabla_ul = document.getElementById("bacanja");
let izbor_ul = document.getElementById("izbor_ul");
let liIzbor = izbor_ul.getElementsByTagName('li');
let liBacanja = tabla_ul.getElementsByTagName('li'); //svi li iz bacanja

let prvaprazna = 0;
var b = 0;
let rezultat = {
    1: b,
    2: b,
    3: b,
    4: b,
    5: b,
    6: b,
};

var bacanje = [];
var brojKockica = 6;

function igraj()

{

    for (let i = 0; i < 3; i++) {

        ispraznipolja(liBacanja);
        let j = 0;
        bacanje = [];

        while (j < brojKockica) {
            bacanje[j] = Math.ceil(Math.random() * 6);
            liBacanja[j].innerHTML = `<img id='${bacanje[j]}' src='img/dice-${bacanje[j]}.png'>`; //bacanje[j];
            j++
        }

        let brojbacanja = i + 1;
        console.log("Tvoje " + brojbacanja + " bacanje je : " + bacanje);
        izbor_broja_kockice_za_odvajanje();

    }

    ispraznipolja(liBacanja);
    upisi_rezultat(rezultat);
}



function izbor_broja_kockice_za_odvajanje() {
    let izbor = prompt("Izaberi kockice koje ces odvojiti:");
    let izbroj = 0;

    let kopijaBacanja = [...bacanje];
    for (let i = 0; i < kopijaBacanja.length; i++) {
        if (kopijaBacanja[i] == izbor) {
            bacanje.splice(i, 1);
            liBacanja[i].innerHTML = "";
        }
    }

   for (let jj = 0; jj < brojKockica; jj++) {
        if (kopijaBacanja[jj] == izbor) {
            izbroj++;
        }
    } 

    console.log("***IZBOR***");
    for (prop in rezultat) {
        if (izbor === prop) {
            rezultat[prop] = rezultat[prop] + izbroj;
        }
        console.log("Kockica sa brojem " + prop + " imate : " + rezultat[prop]);
    }

    popuni_izbor();

    vratiUigru()


    function vratiUigru(){

        let vrati = 0;
        let izborZaVracanje = prompt("Da li vracas neke kockice u igru?");
        if (izborZaVracanje != null) {
            for (prop in rezultat) {
                if (prop === izborZaVracanje) {
                    vrati = rezultat[prop];
                    rezultat[prop] = 0;
                    brojKockica = brojKockica + vrati;
                }
            }
            popuni_izbor();
        }
    
        brojKockica = brojKockica - izbroj;
    }

    function popuni_izbor() {
        //isprazni polja
        for (let i = 0; i < liIzbor.length; i++) {
            liIzbor[i].innerHTML = "";
        }

        for (prop in rezultat) {
            if (rezultat[prop] != 0) {
                let ii = 0;
                while (prvaprazna == "") {
                    if (liIzbor[ii].innerHTML === "") {
                        prvaprazna = ii + 1;
                    }
                    ii++
                }

                //upisi u liIzbor, npr tri jedinice, rezultat[prop]=3 prop=1
                for (let iii = 0; iii < rezultat[prop]; iii++) {
                    liIzbor[prvaprazna - 1 + iii].innerHTML = `<img id='${prop}' src='img/dice-${prop}.png'>`; //prop;
                }
                prvaprazna = ""; //u liIzbor
            }
        }
    }
}



function upisi_rezultat(rezultat) {

    console.log("***KRAJ OVOG BACANJA***");
    for (prop in rezultat) {
        console.log("Kockica sa brojem " + prop + " imate : " + rezultat[prop]);
    }
    izbor_za_upis();
    console.log("Zbir u slobodnoj koloni: " + igrac["yamb"]["slobodnakolona"]);

}

//U GLAVNU TABELU
function izbor_za_upis() {

    console.log("***IZBOR ZA UPIS ZA SADA SAMO U SLOBODNU KOLONU***");
    for (prop in rezultat) {
        console.log("Zbir u slobodnoj koloni je  " + prop + " je : " + rezultat[prop] * prop);
    }

    let izbor_za_upis = [];
    izbor_ul.addEventListener('click', function (e) {
        if (e.target.className === "active") {
            e.target.className = "";
            e.target.style.opacity = '1';
            let index = izbor_za_upis.indexOf(e.target.id);
            izbor_za_upis.splice(index, 1);
        } else {
            e.target.style.opacity = `.5`;
            e.target.className = "active";
            izbor_za_upis.push(e.target.id);
        }
         console.log(izbor_za_upis)
    })

    /*Ovde kliknuti na polje u koje cemo uneti */
    li_slobodna_kolona_unos.addEventListener("click", function (e) {
        if (e.target && e.target.matches("li.unos")) {
            let zbir = 0;
            for (let i = 0; i < izbor_za_upis.length; i++) {
                zbir += parseInt(izbor_za_upis[i]);
            }

            e.target.innerHTML = zbir;
            ispraznipolja(izbor_ul.querySelectorAll('li'));

        }
    });







    //let izbor_za_upis = prompt('Izaberite šta ćete upisati u slobodnu kolonu: ');

    //let click = li_unos.addEventListener('click',() =>console.log("kliknuto"))
    //let izbor_za_upis = ;


    /*  for (prop in igrac) {
         if (prop === "yamb") {
             igrac[prop]["slobodnakolona"][izbor_za_upis - 1] = rezultat[izbor_za_upis] * izbor_za_upis;
         }
     }


     for (prop in rezultat) {
         if (rezultat[prop] === 0) {
             //igraj();
         }
     } */
}


function ispraznipolja(li) {
    for (let i = 0; i < li.length; i++) {
        li[i].innerHTML = " ";
        li[i].style.backgroundColor = 'transparent';
    }
}

igraj();