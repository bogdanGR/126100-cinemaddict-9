
export const createMenuTemplate = ({title, count}) =>`
    <a href="#${title}" class="main-navigation__item">${title} <span class="main-navigation__item-count">${count}</span></a>
`;
export const getFilters = (filters) => {
  return `
    <nav class="main-navigation"> 
     <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${filters.map((filter) => createMenuTemplate(filter)).slice(1, 4).join(``)}
            <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>
  `;
};
