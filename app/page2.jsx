import {React, component} from 'efficiently-core';
import {Table} from 'efficiently-components';
import {server, requestNewItems} from 'efficiently-actions';

const pictureRenderer = function(cell) {
  cell.element.innerHTML = "<img style='width: 30px' src='" + cell.data + "' />";
};

export default component((state, dispatch) => (
  <Table
    items={state.pageUserList.items}
    columns={[
      {name: "thumbnail", width: 100, renderer: pictureRenderer},
      {name: "firstname"},
      {name: "lastname"},
      {name: "email"},
    ]}
    onUserSelect={(user) => console.log('selected user: ' + JSON.stringify(user))}
    onRequestNewItems={() => dispatch(server(requestNewItems()))}
    ></Table>
));
