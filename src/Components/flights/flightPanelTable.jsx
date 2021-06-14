import { Row, Col, Statistic, Progress, Divider } from 'antd';

const FlightDetail = ({ flightPanelInfo }) => {
  return (
    <>
      <Row gutter={16} style={{ marginTop: '15px' }}>
        <h3>飞行进度</h3>
        <Col span={24}>
          <Progress
            percent={flightPanelInfo ? flightPanelInfo[0].time.progress : null}
            status="active"
          />
        </Col>
      </Row>
      <Divider dashed />
      <Row gutter={16} style={{ marginTop: '15px' }}>
        <Col span={12}>
          <Statistic
            title="出发机场"
            loading={flightPanelInfo ? false : true}
            value={
              flightPanelInfo ? flightPanelInfo[0].airport.origin.name : '-'
            }
            valueStyle={{ fontSize: '20px' }}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="到达机场"
            loading={flightPanelInfo ? false : true}
            value={
              flightPanelInfo
                ? flightPanelInfo[0].airport.destination.name
                : '-'
            }
            valueStyle={{ fontSize: '20px' }}
          />
        </Col>
      </Row>
      <Divider dashed />
      <Row gutter={16} style={{ marginTop: '15px' }}>
        <Col span={12}>
          <Statistic
            title="计划出发时间"
            loading={flightPanelInfo ? false : true}
            value={
              flightPanelInfo ? flightPanelInfo[0].time.scheduled_dep : null
            }
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="计划到达时间"
            loading={flightPanelInfo ? false : true}
            value={
              flightPanelInfo ? flightPanelInfo[0].time.scheduled_arr : null
            }
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="实际出发时间"
            loading={flightPanelInfo ? false : true}
            value={flightPanelInfo ? flightPanelInfo[0].time.real_dep : null}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="预计到达时间"
            loading={flightPanelInfo ? false : true}
            value={
              flightPanelInfo ? flightPanelInfo[0].time.estimated_arr : null
            }
          />
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: '15px' }}>
        <Col span={24}>
          <Statistic
            title="航空公司"
            loading={flightPanelInfo ? false : true}
            value={flightPanelInfo ? flightPanelInfo[0].airline.name : '-'}
            valueStyle={{ fontSize: '20px' }}
          />
        </Col>
      </Row>
      <Divider dashed />
      <Row gutter={16} style={{ marginTop: '15px' }}>
        <Col span={6}>
          <Statistic
            title="当前经度"
            loading={flightPanelInfo ? false : true}
            value={flightPanelInfo ? flightPanelInfo[0].trail.current.lng : '-'}
            precision={4}
            valueStyle={{ fontSize: '20px' }}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="当前纬度"
            loading={flightPanelInfo ? false : true}
            value={flightPanelInfo ? flightPanelInfo[0].trail.current.lat : '-'}
            precision={4}
            valueStyle={{ fontSize: '20px' }}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="当前高度"
            loading={flightPanelInfo ? false : true}
            value={flightPanelInfo ? flightPanelInfo[0].trail.current.alt : '-'}
            suffix=" ft"
            valueStyle={{ fontSize: '20px' }}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="当前速度"
            loading={flightPanelInfo ? false : true}
            value={flightPanelInfo ? flightPanelInfo[0].trail.current.spd : '-'}
            suffix=" kts"
            valueStyle={{ fontSize: '20px' }}
          />
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: '15px' }}>
        <Col span={12}>
          <Statistic
            title="机型"
            loading={flightPanelInfo ? false : true}
            value={
              flightPanelInfo ? flightPanelInfo[0].aircraft.model.text : '-'
            }
            precision={4}
            valueStyle={{ fontSize: '20px' }}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="飞机注册号"
            loading={flightPanelInfo ? false : true}
            value={
              flightPanelInfo ? flightPanelInfo[0].aircraft.registration : '-'
            }
            precision={4}
            valueStyle={{ fontSize: '20px' }}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="机龄"
            loading={flightPanelInfo ? false : true}
            value={flightPanelInfo ? flightPanelInfo[0].aircraft.age : '-'}
            suffix=" 年"
            valueStyle={{ fontSize: '20px' }}
          />
        </Col>
      </Row>
    </>
  );
};

export default FlightDetail;
