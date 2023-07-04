// Write your code here
import {PieChart, Pie, Legend, Cell} from 'recharts'

import './index.css'

const VaccinationByAge = props => {
  const {vaccinationAgeDetails} = props

  return (
    <div className="card-con">
      <h1 className="heading">Vaccination by age</h1>
      <PieChart width={1000} height={300}>
        <Pie
          cx="50%"
          cy="30%"
          data={vaccinationAgeDetails}
          outerRadius="60%"
          dataKey="count"
        >
          <Cell name="18-44" fill="#fecba6" />
          <Cell name="44-60" fill="#b3d23f" />
          <Cell name="above 60" fill="#a44c9e" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{fontFamily: 'Roboto', fontSize: 12}}
        />
      </PieChart>
    </div>
  )
}
export default VaccinationByAge
