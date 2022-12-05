package data.util;

import java.util.Calendar;

public class ChangeFileName {
	public static String changeFileName(String photoName) {
		int dotLoc = photoName.indexOf('.');
		String ext = photoName.substring(dotLoc); //.포함 확장자명

		Calendar cal = Calendar.getInstance();
		int y = cal.get(Calendar.YEAR);
		int m = cal.get(Calendar.MONTH) + 1;
		int d = cal.get(Calendar.DATE);
		int hh = cal.get(Calendar.HOUR);
		int mm= cal.get(Calendar.MINUTE);
		int ss = cal.get(Calendar.SECOND);
		int ms = cal.get(Calendar.MILLISECOND);

		photoName = "" + y + (m<10 ? "0"+m : m) + (d<10 ? "0"+d : d) + (hh<10 ? "0"+hh : hh) + (mm<10 ? "0"+mm : mm) + (ss<10 ? "0"+ss : ss) + ms + ext;
		
		return photoName;
	}
}