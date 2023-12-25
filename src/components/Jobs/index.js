import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import JobsList from '../JobsList'
import Header from '../Header'
import Profile from '../Profile'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]
const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
const apiVal = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class Jobs extends Component {
  state = {
    profile: {},
    apiStatus: apiVal.initial,
    listOfJobs: [],
    salaryRange: '',
    searchIn: '',
    searchRes: '',
    jobTypLis: [],
  }

  componentDidMount() {
    this.getData()
  }

  upSearch = () => {
    const {searchRes} = this.state
    this.setState({searchIn: searchRes}, this.getData)
  }

  changeSearch = event => {
    this.setState({searchRes: event.target.value})
  }

  upSal = id => {
    console.log(id)
    this.setState({salaryRange: id}, this.getData)
  }

  upEmpType = id => {
    const {jobTypLis} = this.state
    if (jobTypLis.includes(id)) {
      const newLi = jobTypLis.filter(i => i !== id)
      this.setState({jobTypLis: newLi}, this.getData)
    } else {
      this.setState(pre => ({jobTypLis: [...pre.jobTypLis, id]}), this.getData)
    }
  }

  retryApi = () => {
    this.setState(
      {
        profile: {},
        apiStatus: apiVal.initial,
        listOfJobs: [],
        salaryRange: '',
        searchIn: '',
        searchRes: '',
        jobTypLis: [],
      },
      this.getData,
    )
  }

  getData = async () => {
    const {salaryRange, searchIn, jobTypLis} = this.state
    this.setState({apiStatus: apiVal.inprogress})
    const jobType = jobTypLis.join(',')
    console.log(jobType)
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    if (response.ok) {
      const data = await response.json()
      const newData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      const responseJob = await fetch(
        `https://apis.ccbp.in/jobs?employment_type=${jobType}&minimum_package=${salaryRange}&search=${searchIn}`,
        options,
      )
      const jobsData = await responseJob.json()
      const newJobList = jobsData.jobs.map(i => ({
        companyLogoUrl: i.company_logo_url,
        employmentType: i.employment_type,
        id: i.id,
        jobDescription: i.job_description,
        location: i.location,
        packagePerAnnum: i.package_per_annum,
        rating: i.rating,
        title: i.title,
      }))
      this.setState({
        profile: newData,
        listOfJobs: newJobList,
        apiStatus: apiVal.success,
      })
    } else {
      this.setState({apiStatus: apiVal.failure})
    }
  }

  renderFail = () => (
    <div className="failDiv">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failImg"
      />
      <h1>Search result not found</h1>
      <button type="button" className="logoutBut" onClick={this.retryApi}>
        Retry
      </button>
    </div>
  )

  renderSuccess = () => {
    const {listOfJobs} = this.state

    if (listOfJobs.length === 0) {
      return this.renderFail()
    }

    return (
      <>
        <ul className="ulEd">
          {listOfJobs.map(i => (
            <JobsList each={i} key={i.id} />
          ))}
        </ul>
      </>
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
    const {profile, searchRes} = this.state

    return (
      <div className="jobsContainer">
        <Header />
        <div className="div12">
          <div className="div11">
            <Profile profile={profile} />
            <hr />
            <ul className="typMr">
              <h1 className="typeHead">Type of employment</h1>
              {employmentTypesList.map(i => (
                <li key={i.employmentTypeId} className="liStyle">
                  <input
                    type="checkbox"
                    id={i.employmentTypeId}
                    onClick={() => this.upEmpType(i.employmentTypeId)}
                  />
                  <label htmlFor={i.employmentTypeId}>{i.label}</label>
                </li>
              ))}
            </ul>
            <hr />
            <ul className="typMr">
              <h1 className="typeHead">Salary Range</h1>
              {salaryRangesList.map(i => (
                <li key={i.salaryRangeId} className="liStyle">
                  <input
                    type="radio"
                    id={i.salaryRangeId}
                    name="salary"
                    onClick={() => this.upSal(i.salaryRangeId)}
                  />
                  <label htmlFor={i.salaryRangeId}>{i.label}</label>
                </li>
              ))}
            </ul>
          </div>
          <div className="div13">
            <>
              <div className="div14">
                <input
                  type="text"
                  value={searchRes}
                  placeholder="search"
                  onChange={this.changeSearch}
                  className="marIn"
                />
                <button
                  type="button"
                  data-testid="searchButton"
                  className="searchBut"
                  onClick={this.upSearch}
                >
                  .<BsSearch className="search-icon" />
                </button>
              </div>
              {this.onFinalOut()}
            </>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
