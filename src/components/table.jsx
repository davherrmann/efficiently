import React from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'seamless-immutable';

export default React.createClass({
      render: function(){
        return (
          <vaadin-grid />
        )
      },

      componentWillReceiveProps: function(nextProps) {
        var vGrid = ReactDOM.findDOMNode(this);
        console.log("items: " + vGrid.size + ", " + nextProps.items.length + ", " + this.props.items.length + ", " + this.params.index + ", " + this.params.count);

        if (nextProps.items.length >= this.props.items.length) {
          console.log("refresh")
          // TODO show when to use Immutable!
          this.callback(
            Immutable(this.props.items)
              .asMutable({deep: true})
              .slice(this.params.index, this.params.index + this.params.count),
            nextProps.items.length
          );
        }
      },

      componentDidMount: function() {
        var _this = this;
        var vGrid = ReactDOM.findDOMNode(_this);

        // Let the mounted <vaadin-grid> upgrade
        (function wait() {
          if (vGrid.selection) {
            // Assign the data source
            vGrid.items = _this.items;

            // Bind selection listener
            vGrid.addEventListener("selected-items-changed", _this.onRowSelect);

            // Define columns
            vGrid.columns = Immutable(_this.props.columns).asMutable({deep: true});

          } else {
              setTimeout( wait, 50 );
          }
        })();
      },

      items: function(params, callback) {
        var vGrid = ReactDOM.findDOMNode(this);
        console.log("items: " + vGrid.size + ", " + this.props.items.length + ", " + params.index + ", " + params.count);

        if (params.index + params.count === vGrid.size) {
          console.log("request new items");
          this.callback = callback;
          this.params = params;
          this.props.onRequestNewItems();
        } else {
          callback(
            Immutable(this.props.items)
              .asMutable({deep: true})
              .slice(params.index, params.index + params.count),
            this.props.items.length
          );
        }

      },

      onRowSelect: function(e) {
        var onUserSelect = this.props.onUserSelect;
        var index = e.target.selection.selected()[0];
        e.target.getItem(index, function(err, data) {
          onUserSelect(err ? undefined : data.firstname);
        });
      }
    });
