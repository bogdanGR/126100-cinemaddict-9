export const createFooter = ({count}) =>`
    <p>${count} movies inside</p>
`;
export const getFooterTemplate = (filters) => {
  return `
        <footer class="footer">
          <section class="footer__logo logo logo--smaller">Cinemaddict</section>
          <section class="footer__statistics">
          ${filters.map((filter) => createFooter(filter)).slice(0, 1).join(``)}
        </section>
        </footer>
  `;
};
