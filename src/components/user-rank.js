export const createUserProfileTemplate = ({count}) =>`
    <p class="profile__rating">${count}</p>
`;
export const getUserRank = (filters) => {
  return `
  <section class="header__profile profile">
    ${filters.map((filter) => createUserProfileTemplate(filter)).slice(2, 3).join(``)}
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>
  `;
};
