import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import {MdLocationOn} from 'react-icons/md'
import Header from '../Header'
import './index.css'

const apiVal = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiVal.initial,
    jobDetails: {},
    skills: [],
    lifeAtCompany: {},
    similarJobs: [],
  }

  componentDidMount = () => {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiVal.inprogress})
    const token = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)
    if (response.ok) {
      const data = await response.json()
      const newJob = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }
      const skill = data.job_details.skills.map(i => ({
        name: i.name,
        imageUrl: i.image_url,
      }))
      const life = {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }
      const similar = data.similar_jobs.map(i => ({
        companyLogoUrl: i.company_logo_url,
        employmentType: i.employment_type,
        id: i.id,
        jobDescription: i.job_description,
        location: i.location,
        rating: i.rating,
        title: i.title,
      }))
      this.setState({
        jobDetails: newJob,
        skills: skill,
        lifeAtCompany: life,
        similarJobs: similar,
        apiStatus: apiVal.success,
      })
    } else {
      this.setState({apiStatus: apiVal.failure})
    }
  }

  renderFail = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button">Retry</button>
    </div>
  )

  renderSuccess = () => {
    const {jobDetails, skills, lifeAtCompany, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails

    return (
      <div className="div32">
        <div className="div33">
          <div className="div21">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="compImg"
            />
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
          <hr />
          <div className="div92">
            <h1>Description</h1>
            <div className="div93">
              <a href={companyWebsiteUrl}>Visit</a>
              <BiLinkExternal />
            </div>
          </div>
          <p>{jobDescription}</p>
          <h1 className="skEd">Skills</h1>
          <ul className="skilUl">
            {skills.map(i => (
              <li key={i.name} className="skilLi">
                <img src={i.imageUrl} alt={i.name} className="skImg" />
                <p>{i.name}</p>
              </li>
            ))}
          </ul>
          <h1>Life at Company</h1>
          <div className="div34">
            <p className="paWid">{lifeAtCompany.description}</p>
            <img src={lifeAtCompany.imageUrl} alt="life at company" />
          </div>
        </div>
        <h1>Similar Jobs</h1>
        <ul className="edUl">
          {similarJobs.map(i => (
            <li className="lifeLi" key={i.id}>
              <div className="div21">
                <img
                  src={i.companyLogoUrl}
                  alt="similar job company logo"
                  className="compImg"
                />
                <div>
                  <h1 className="headEd">{i.title}</h1>
                  <div className="ratEd">
                    <BsStarFill className="icEd" />
                    <p>{rating}</p>
                  </div>
                </div>
              </div>
              <h1 className="desEd">Description</h1>
              <p>{i.jobDescription}</p>
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
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container loadEd" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onFinalOut = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'INPROGRESS':
        return this.renderLoader()
      case 'SUCCESS':
        return this.renderSuccess()
      case 'FAILURE':
        return this.renderFail()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="div31">
        <Header />
        {this.onFinalOut()}
      </div>
    )
  }
}

export default JobItemDetails
