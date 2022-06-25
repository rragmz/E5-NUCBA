/*
En este ultimo desafío general vamos a utilizar el mismo array "Pizzas🍕":

👉 Guardarlo en el local storage. 
👉 Renderizar HTML desde JS. 
👉 Renderizar en cards todas las pizzas del array (Incluir nombre, imagen, precio e ingredientes). 
👉 Crear una barra de búsqueda (input), la cual tenga la función de mostrarnos solo las pizzas cuyos nombres coincidan con la búsqueda realizada. 
*/

const $input = document.getElementById('input');

const $button = document.getElementById('button');
const $ingredientes = document.createElement('h3');
$ingredientes.setAttribute('class', 'ingredients');
const ingredientesText = document.createTextNode('Ingredientes');
$ingredientes.appendChild(ingredientesText);
const $container = document.getElementById('container');
const $card = document.createElement('div');
$card.setAttribute('class', 'card');

//Función que, al tocar cualquiera de las pizzas, renderiza ese nombre en el texto del input
function inputValue(text) {
    $input.value = text;
}

class Pizza{
    constructor(ID, nombre, ingredientes, precio, image, description, calories, time){
        this.ID = ID;
        this.nombre = nombre;
        this.ingredientes = ingredientes;
        this.precio = precio;
        this.image = image;
        this.description = description;
        this.calories = calories;
        this.time = time
    }
}

const American = new Pizza(1, 'AMERICAN', ['Muzzarella', 'salame', 'morroncito verde', 'panceta'], 1500, 'imgs/tiny/american.png', '¿Una pizza puede ser el vuelo directo al sabor de las calles de New York? ¡Descubrilo!', '1500 Kcal', '40 MIN');
const Pepperoni = new Pizza(2, 'PEPPERONI', ['Muzzarella', 'una locura de salame', 'morroncito rojo', 'orégano fresco'], 1400, 'imgs/tiny/pepperoni.png', 'Nathy Peluso dice: "vendo mi alma por una pizza" y nosotros también, por esta! 🍕', '1600 Kcal', '25 MIN');
const Classic = new Pizza(3, 'CLASSIC', ['Salsa de tomate casera caserita', 'muzzarella', 'orégano'], 1000, 'imgs/tiny/mozzarella.png', 'La muzza de siempre pero con una salsa que te va a volar la cabeza!', '1200 Kcal', '20 MIN');
const Anchoita = new Pizza(4, 'ANCHOITA', ['Muzzarella', 'anchoitas', 'rúcula', 'aceitunas negras', 'quesito parmesano'], 1500, 'imgs/tiny/anchovy-arugula.png', 'Comete esta pizza y avivate! A la clásica le agregamos un corazón de rúcula, para la dieta... 😝', '1300 Kcal', '40 MIN');
const Pepperonion = new Pizza(5, 'PEPPERONION', ['Muzzarella', 'cebolla', 'morroncito verde'], 1100, 'imgs/tiny/onion-bellpepper.png', 'Somos muy fans del morrón en todos lados y cuando pruebes esta pizza vas a saber porqué', '1100 Kcal', '30 MIN');
const Meat = new Pizza(6, 'MEAT', ['Muzzarella', 'carne picada', 'morroncito verde'], 1200, 'imgs/tiny/meat-bellpepper.png', 'Si sos fanático de la carne, esta es LA opción y si no consumís, no te preocupes, la vegetarianizamos 😏', '1150 Kcal', '40 MIN');


const Pizzas = [];
Pizzas.push(American, Pepperoni, Classic, Anchoita, Pepperonion, Meat);
//Guardo el array de pizzas en el localStorage
localStorage.setItem('Pizzas', JSON.stringify(Pizzas));

const PizzasSelected = () => {
    $input.value = "";
    $button.addEventListener("click", (e)=>{
        while($card.firstChild){
            $card.removeChild($card.firstChild);
        }

        let inputValue = $input.value.toUpperCase();

        //Buscamos si tenemos una pizza con el nombre ingresado en el input
        const pizzaSelected = Pizzas.find((pizza) => pizza.nombre === inputValue);
        localStorage.setItem('Pizza seleccionada', JSON.stringify(pizzaSelected));

        if(pizzaSelected === undefined){
            swal('Ups!', 'No tenemos pizza con ese nombre 🙁', 'error');
            $container.removeChild($card);
        }
        else{
            const $info = document.createElement('div');
            $info.setAttribute('class', 'info');
            

            //Nombre de la pizza
            const $h2 = document.createElement('h2');
            $h2.setAttribute('class', 'title')
            const h2Text = document.createTextNode(pizzaSelected.nombre);
            $h2.appendChild(h2Text);

            //Descripcion
            const $description = document.createElement('p');
            $description.setAttribute('class', 'pizza-description');
            const descriptionTxt = document.createTextNode(pizzaSelected.description);
            $description.appendChild(descriptionTxt);

            //Lista de ingredientes
            const $ingredientesDesc = document.createElement('p');
            $ingredientesDesc.setAttribute('class', 'ingredient-description');
            let ingredientesDescText;
            for(let i = 0; i < pizzaSelected.ingredientes.length; i++){
                if(i < pizzaSelected.ingredientes.length-1){
                    ingredientesDescText = document.createTextNode(`${pizzaSelected.ingredientes[i]}, `);
                    $ingredientesDesc.appendChild(ingredientesDescText);
                }
                else{
                    ingredientesDescText = document.createTextNode(`${pizzaSelected.ingredientes[i]}`);
                    $ingredientesDesc.appendChild(ingredientesDescText);
                }
            }

            //Info adicional
            const $infoPizza = document.createElement('div');
            $infoPizza.setAttribute('class', 'info-pizza');
            //Calorías
            const $calories = document.createElement('i');
            $calories.setAttribute('class', 'fa-solid fa-circle-info')
            const caloriesText = document.createTextNode(' ' + pizzaSelected.calories);
            $calories.appendChild(caloriesText);

            //Tiempo de preparación
            const $tiempo = document.createElement('i');
            $tiempo.setAttribute('class', 'fa-solid fa-clock')
            const tiempoTxt = document.createTextNode(' ' + pizzaSelected.time);
            $tiempo.appendChild(tiempoTxt);

            //Precio
            const $price = document.createElement('i');
            $price.setAttribute('class', 'fa-solid fa-money-bill')
            const priceText = document.createTextNode(' $' + pizzaSelected.precio);
            $price.appendChild(priceText);

            //Agrego los hijos al div INFOPIZZA
            $infoPizza.appendChild($calories);
            $infoPizza.appendChild($tiempo);
            $infoPizza.appendChild($price);

            //Agrego al div INFO
            $info.appendChild($h2);
            $info.appendChild($description);
            $info.appendChild($ingredientes);
            $info.appendChild($ingredientesDesc);
            $info.appendChild($infoPizza);

            //IMAGEN
            const $divImg = document.createElement('div');
            $divImg.setAttribute('class', 'img');
            const $img = document.createElement('img');
            $img.setAttribute('src', pizzaSelected.image);
            $divImg.appendChild($img);

            //Agrego al div CARD
            $card.appendChild($info);
            $card.appendChild($divImg);

            $container.appendChild($card);
            $input.value = "";
        }
    })
}
PizzasSelected();
