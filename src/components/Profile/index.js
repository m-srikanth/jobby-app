import './index.css'

const Profile = props => {
  const {profile} = props
  const {name, profileImageUrl, shortBio} = profile

  return (
    <div className="profileContainer">
      <img src={profileImageUrl} alt={name} className="proImg" />
      <h1 className="pHead">{name}</h1>
      <p className="pPara">{shortBio}</p>
    </div>
  )
}

export default Profile
