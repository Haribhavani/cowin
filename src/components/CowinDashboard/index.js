// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationCoverage from '../VaccinationCoverage'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {vaccinationData: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const Data = await response.json()
      const updatedData = {
        last7DaysVaccination: Data.last_7_days_vaccination.map(each => ({
          vaccinationDate: each.vaccine_date,
          dose1: each.dose_1,
          dose2: each.dose_2,
        })),
        vaccinationByAge: Data.vaccination_by_age.map(each => ({
          age: each.age,
          count: each.count,
        })),
        vaccinationByGender: Data.vaccination_by_gender.map(each => ({
          gender: each.gender,
          count: each.count,
        })),
      }
      this.setState({
        vaccinationData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderVaccinationStatus = () => {
    const {vaccinationData} = this.state
    return (
      <>
        <VaccinationCoverage
          vaccinationCoverageDetails={vaccinationData.last7DaysVaccination}
        />
        <VaccinationByGender
          vaccinationGenderDetails={vaccinationData.vaccinationByGender}
        />
        <VaccinationByAge
          vaccinationAgeDetails={vaccinationData.vaccinationByAge}
        />
      </>
    )
  }

  renderFailure = () => (
    <div className="failure-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="image"
      />
      <h1 className="text">Something went wrong</h1>
    </div>
  )

  renderLoading = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderStatusDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVaccinationStatus()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoading()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-con">
        <div className="card-con">
          <div className="logo-con">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="logo"
            />
            <h1 className="heading">Co-WIN</h1>
          </div>
          <h1 className="heading2">CoWIN Vaccination in India</h1>
          {this.renderStatusDetails()}
        </div>
      </div>
    )
  }
}
export default CowinDashboard
