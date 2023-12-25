import {Link} from 'react-router-dom'
import {BsStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const JobsList = props => {
  const {each} = props
  const {
    id,
    companyLogoUrl,
    packagePerAnnum,
    location,
    employmentType,
    jobDescription,
    rating,
    title,
  } = each

  return (
    <Link className="link" to={`/jobs/${id}`}>
      <li className="jobLi">
        <div className="div21">
          <img src={companyLogoUrl} alt={title} className="compImg" />
          <div>
            <p className="marP">{title}</p>
            <div className="ratEd">
              <BsStarFill className="icEd" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="div90">
          <div className="div91">
            <div className="ratEd">
              <MdLocationOn className="icEd1" />
              <p>{location}</p>
            </div>
            <div className="ratEd">
              <BsFillBriefcaseFill className="icEd1" />
              <p>{employmentType}</p>
            </div>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr className="hrEd" />
        <h1 className="desEd">Description</h1>
        <p>{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobsList
