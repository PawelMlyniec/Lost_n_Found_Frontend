export default function ({ auth, redirect }) {
  if (!localStorage.getItem('user') || !localStorage.getItem('access_token')) {
    redirect('/')
  }
}
