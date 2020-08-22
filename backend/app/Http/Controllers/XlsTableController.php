<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\XlsTable;
use App\CityToRuler;
class XlsTableController extends Controller
{
	public function xlsView(){
		return view('coin.dashboard.xls');
	}

    public function uploadXls(Request $req){
    	$uploadedFile = $req->file('xls_file');
    	$reader = new \PhpOffice\PhpSpreadsheet\Reader\Xlsx();
		if($reader) {
		  $reader->setReadDataOnly(true);
		  $spreadsheet = $reader->load($uploadedFile);  
		  $sheetData = $spreadsheet->getActiveSheet()->toArray();

		  foreach($sheetData as $row) {
		    // get columns
		    $city = isset($row[0]) ? $row[0] : "";
		    $ruler = isset($row[1]) ? $row[1] : "";
		    // $cat = isset($row[2]) ? $row[2] : "";

		    $xls = new CityToRuler;
		    $xls->city = $city;
		    $xls->ruler = $ruler;
		    // $xls->category = $cat;

		    $xls->save();
		  }

		  print 'File uploaded to DB';
		}
    }

    public function testUploadXls(Request $req){
    	$uploadedFile = $req->file('xls_file');
    	// $file_mimes = array('text/x-comma-separated-values', 'text/comma-separated-values', 'application/octet-stream', 'application/vnd.ms-excel', 'application/x-csv', 'text/x-csv', 'text/csv', 'application/csv', 'application/excel', 'application/vnd.msexcel', 'text/plain', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
		// if(isset($_FILES['upload_file']['name']) && in_array($_FILES['upload_file']['type'], $file_mimes)) {
			// $arr_file = explode('.', $_FILES['upload_file']['name']);
			// $extension = end($arr_file);
			// if('csv' == $extension){
				// $reader = new \PhpOffice\PhpSpreadsheet\Reader\Csv();
			// } else {
				$reader = new \PhpOffice\PhpSpreadsheet\Reader\Xlsx();
			// }
			$spreadsheet = $reader->load($uploadedFile);
			$sheetData = $spreadsheet->getActiveSheet()->toArray();
			echo "<pre>";
			print_r($sheetData);
    	// }
	}

    public function export(){
		$spreadsheet = new Spreadsheet();
		$sheet = $spreadsheet->getActiveSheet();
		$sheet->setCellValue('A1', 'Hello World !');
		$writer = new Xlsx($spreadsheet);
		$filename = 'name-of-the-generated-file';
		 
		header('Content-Type: application/vnd.ms-excel');
		header('Content-Disposition: attachment;filename="'. $filename .'.xlsx"');
		header('Cache-Control: max-age=0');
		$writer->save('php://output'); // download file
	}

}
