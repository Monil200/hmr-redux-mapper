/* AUTOGENERATED FILE - DO NOT MODIFY */
/* generated by HMR_ReduxMapper */
module.exports = 
{
  "global": [
  {
    "reducerName": "store2",
    "importFunc": function()
    {
      return System.import(
        'mapper-tool/tests/data/simple-combined/components/store2_reducer'
      );
    }
  }],
  "containerSpecific":
  {
    "./containers/container1.jsx":
    {
      "importFunc": function()
      {
        return System.import(
          './containers/container1'
        );
      },
      "reducers": [
      {
        "reducerName": "store1",
        "importFunc": function()
        {
          return System.import(
            'mapper-tool/tests/data/simple-combined/components/store1_reducer'
          );
        }
      }]
    },
    "./containers/container2.jsx":
    {
      "importFunc": function()
      {
        return System.import(
          './containers/container2'
        );
      },
      "reducers": [
      {
        "reducerName": "store1",
        "importFunc": function()
        {
          return System.import(
            'mapper-tool/tests/data/simple-combined/components/store1_reducer'
          );
        }
      }]
    },
    "./containers/container3.jsx":
    {
      "importFunc": function()
      {
        return System.import(
          './containers/container3'
        );
      },
      "reducers": [
      {
        "reducerName": "store1",
        "importFunc": function()
        {
          return System.import(
            'mapper-tool/tests/data/simple-combined/components/store1_reducer'
          );
        }
      },
      {
        "reducerName": "store3",
        "importFunc": function()
        {
          return System.import(
            'mapper-tool/tests/data/simple-combined/components/store3_reducer'
          );
        }
      }]
    }
  }
};