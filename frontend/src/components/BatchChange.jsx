import React, { useState, useEffect } from 'react';

const BatchChange = ({ userName }) => {
  const [selectedBatch, setSelectedBatch] = useState('');
  const [errorBatchChange, setErrorBatchChange] = useState('');
  const [statusBatchChange, setStatusBatchChange] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentBatch, setCurrentBatch] = useState('');
  const [currentBatchId, setCurrentBatchId] = useState('');

  useEffect(() => {
    const fetchMostRecentBatch = async () => {
      try {
        setFetching(true);
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/get-current-batch?username=${userName}`);        if (response.status === 200) {
          const data = await response.json();
          setCurrentBatchId(`${data.current_batch}` || '');
          setCurrentBatch(`${data.batch}` || '');
        } else {
          const data = await response.json();
        }
      } catch (error) {
      }finally{
        setFetching(false);
      }
    };
    
    fetchMostRecentBatch();
  }, [userName]); // useEffect will re-run when userName changes
  
  const handleBatchChange = (e) => {
    setSelectedBatch(e.target.value);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedBatch === '') {
      setErrorBatchChange('Please select batch!');
      setStatusBatchChange(false);
      return;
    }
    else if(selectedBatch===currentBatchId){
      setErrorBatchChange('Selected batch is same as current batch');
      setStatusBatchChange(false);
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/batch-change`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "username":userName,"new_batch_id":selectedBatch}),
      });

      if (response.status===200) {
        setStatusBatchChange(true);
        setErrorBatchChange("");
      } else {
        setStatusBatchChange(false);
      }
    } catch (error) {
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="jumbotron mt-4">
      <h3>Batch Change Request</h3>
      <p>Yoga Batch for this month: {fetching?'Fetching current batch...':currentBatch}</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select a new batch for the next month:</label>
          <select className="form-control" value={selectedBatch} onChange={handleBatchChange}>
            <option value="" disabled>Select Batch</option>
            <option value="1">6-7AM</option>
            <option value="2">7-8AM</option>
            <option value="3">8-9AM</option>
            <option value="4">5-6PM</option>
          </select>
        </div>
        {errorBatchChange && <p className="mt-2" style={{ color: 'red' }}>{errorBatchChange}</p>}
        <button type="submit" className="btn btn-primary mt-2">{loading?'Processing...':'Submit Batch Change'}</button>
        {statusBatchChange === true && <p className="mt-2" style={{ color: 'green' }}>Batch Change Request Processed Successfully</p>}
      </form>
    </div>
  );
};

export default BatchChange;
