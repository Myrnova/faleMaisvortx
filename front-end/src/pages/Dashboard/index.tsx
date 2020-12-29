import React from 'react';

import Checkbox from '../../components/CheckBox/index';

const Dashboard: React.FC = () => {
  return (
    <>
      <div onChange={this.onChangeValue}>
        <Checkbox>FaleMais 30</Checkbox>
        <Checkbox>FaleMais 60</Checkbox>
        <Checkbox>FaleMais 120</Checkbox>
      </div>
    </>
  );
};

export default Dashboard;
