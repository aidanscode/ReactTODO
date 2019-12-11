import React from 'react';

function Copyright() {
	let curYear = (new Date()).getFullYear();
  return (
  	<p className="mb-3 text-muted">&copy; ReactTODO {curYear}</p>
  );
}

export default Copyright;
