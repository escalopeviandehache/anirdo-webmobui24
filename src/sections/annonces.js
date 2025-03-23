import { loadAnnonces, loadAnnoncesCategories, loadDetailsAnnonces } from "../api";
import '../elements/annonce-item';
import { setItem, getItem, getItems, removeItem } from '../lib/local-storage';

//Annonces cover
const annoncesContainer = document.querySelector("div.annonces");
const annoncesTitle = document.querySelector("#section-annonces h4")

//Details annonces
const detailsTitle = document.querySelector(".annonce-details-section-details h4");
const detailsPrice = document.querySelector(".annonce-details-section-details h6");
const detailsDescription = document.querySelector(".annonce-details-section-details p");
const detailImage = document.querySelector("#section-annonce-details > img");


const displayAnnoncesArray = (annonceArray, isStarredView = false) => {

    annoncesTitle.textContent = `Dernières annonces (${annonceArray.length})`;
    annoncesContainer.innerHTML = "";
    annonceArray.forEach(el => {

        const annonce = document.createElement('annonce-item');

        annonce.setAttribute('star', !!getItem(el.id))
        annonce.setAttribute('id', el.id);
        annonce.setAttribute('image_url', el.image_url);
        annonce.setAttribute('title', el.title);
        annonce.setAttribute('price', el.price);

        annonce.addEventListener('star_click', () => {
            if (getItem(el.id)) {
                removeItem(el.id)

                // Si on est dans la vue des favoris, on retire l'élément de la vue
                if (isStarredView) {
                    displayFavorites();
                }

            } else {
                setItem(el.id, el)
            }

            annonce.setAttribute('star', !!getItem(el.id))
        })

        annoncesContainer.append(annonce);
    });
}

const displayLatestAnnonce = async () => {
    const annonces = await loadAnnonces;
    displayAnnoncesArray(annonces);
}

const displayCategorieAnnonce = async (id) => {
    const annonces = await loadAnnoncesCategories(id)
    displayAnnoncesArray(annonces);
}

const displayDetailAnonce = async (id) => {
    const detail = await loadDetailsAnnonces(id);
    detailsTitle.innerHTML = `Annonces > ${detail.title}`;
    detailsPrice.innerHTML = detail.price;
    detailsDescription.innerHTML = detail.description;
    detailImage.src = detail.image_url;
}

const displayFavorites = () => {
    const favorites = getItems();
    displayAnnoncesArray(favorites, true);
    annoncesTitle.textContent = `Intéressantes (${favorites.length})`;
}
export { displayLatestAnnonce, displayCategorieAnnonce, displayDetailAnonce, displayFavorites };