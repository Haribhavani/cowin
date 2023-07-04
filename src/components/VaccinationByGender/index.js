// Write your code here
import {PieChart, Pie, Legend, Cell} from 'recharts'

import './index.css'

const VaccinationByGender = props => {
  const {vaccinationGenderDetails} = props

  return (
    <div className="card-con">
      <h1 className="heading">VaccinationBy Gender</h1>
      <PieChart width={1000} height={300}>
        <Pie
          cx="50%"
          cy="60%"
          data={vaccinationGenderDetails}
          startAngle={180}
          endAngle={0}
          innerRadius="30%"
          outerRadius="40%"
          dataKey="count"
        >
          <Cell name="male" fill="#fecba6" />
          <Cell name="female" fill="#b3d23f" />
          <Cell name="others" fill="#a44c9e" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
        />
      </PieChart>
    </div>
  )
}
export default VaccinationByGender
