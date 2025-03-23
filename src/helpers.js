// Cache la section en cours et affiche celle correspondant à l'id passé en paramètre
const displaySection = (id) => {
  document.querySelector('section.active')?.classList.remove('active')
  document.querySelector(`#section-${id}`)?.classList.add('active')
}

// Same same, avec les liens
const activateLink = (id) => {
  document.querySelector(`nav a.active`)?.classList.remove('active')
  document.querySelector(`nav a[href="${id}"]`)?.classList.add('active')
}

export {displaySection, activateLink}
