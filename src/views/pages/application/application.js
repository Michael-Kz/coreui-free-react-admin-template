import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  CTableHeaderCell,
  CCard,
  CCardHeader,
  CCardBody,
  CTableRow,
  CTableDataCell,
  CTableHead,
  CTable,
  CTableBody,
} from '@coreui/react'

import { cilPencil } from '@coreui/icons'
class Application extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      result: [],
    }
  }

  componentDidMount() {
    fetch('https://test.api.dev.core.purple.studio/api/v1/applications')
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            result: result.result,
          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          })
        },
      )
  }

  render() {
    const { error, isLoaded, result } = this.state
    if (error) {
      return <div>Ошибка: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Загрузка...</div>
    } else {
      console.log(result)
      return (
        <CCard className="mb-4">
          <CCardHeader>Application</CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">_id</CTableHeaderCell>
                  <CTableHeaderCell scope="col">name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">bundleId</CTableHeaderCell>
                  <CTableHeaderCell scope="col">appleid</CTableHeaderCell>
                  <CTableHeaderCell scope="col">googlePackage</CTableHeaderCell>
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {result.map((element) => (
                  <CTableRow key={element._id}>
                    <CTableHeaderCell>{element._id}</CTableHeaderCell>
                    <CTableDataCell>{element.name}</CTableDataCell>
                    <CTableDataCell>{element.bundleId}</CTableDataCell>
                    <CTableDataCell>{element.appleid}</CTableDataCell>
                    <CTableDataCell>{element.googlePackage}</CTableDataCell>
                    <CTableDataCell>
                      <a href="/" customClassName="change-link">
                        Change
                      </a>
                      <CIcon icon={cilPencil} customClassName="change-ico" />
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      )
    }
  }
}
export default Application
