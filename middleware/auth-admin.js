export default async function({ store, redirect }) {
  const token = localStorage.getItem("auth.user") || false;

  if (token !== false) {
    const userLogged = sessionStorage.getItem("auth.loggedIn");
    if (!userLogged) {
      redirect("/login");
    } else {
      store.dispatch("setAdminData").then(data => {
        if (data === null) {
          redirect("/login");
        }
      });
    }
  } else {
    redirect("/login");
  }
}
