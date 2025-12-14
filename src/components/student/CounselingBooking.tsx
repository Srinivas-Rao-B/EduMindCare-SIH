import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Phone, MessageSquare, CheckCircle } from 'lucide-react';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';

interface CounselingSlot {
  id: string;
  counselorName: string;
  date: Date;
  time: string;
  type: 'chat' | 'call';
}

interface Booking {
  id: string;
  slotId: string;
  anonymousId: string;
  date: Date;
  time: string;
  counselorName: string;
  type: 'chat' | 'call';
  status: 'scheduled' | 'completed' | 'cancelled';
}

const CounselingBooking: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState<CounselingSlot | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const [slots] = useState<CounselingSlot[]>([
    { id: '1', counselorName: 'Dr. Sarah Johnson', date: new Date(), time: '10:00 AM', type: 'chat' },
    { id: '2', counselorName: 'Dr. Michael Chen', date: new Date(), time: '2:00 PM', type: 'call' },
    { id: '3', counselorName: 'Dr. Emily Davis', date: addDays(new Date(), 1), time: '11:00 AM', type: 'chat' },
  ]);

  const handleBookSlot = () => {
    if (!selectedSlot) return;
    const booking: Booking = {
      id: Date.now().toString(), slotId: selectedSlot.id, anonymousId: 'ANON-' + Math.random().toString(36).substr(2, 8).toUpperCase(),
      date: selectedSlot.date, time: selectedSlot.time, counselorName: selectedSlot.counselorName, type: selectedSlot.type, status: 'scheduled'
    };
    setBookings(prev => [...prev, booking]);
    setShowBookingForm(false);
    setSelectedSlot(null);
  };

  const getWeekDays = () => {
    const start = startOfWeek(selectedDate);
    return Array.from({ length: 7 }).map((_, i) => addDays(start, i));
  };

  const getTypeIcon = (type: 'chat' | 'call') => type === 'chat' ? <MessageSquare className="w-4 h-4" /> : <Phone className="w-4 h-4" />;
  const getTypeColor = (type: 'chat' | 'call') => type === 'chat' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800';

  const slotsForDate = slots.filter(slot => isSameDay(slot.date, selectedDate) && !bookings.some(b => b.slotId === slot.id));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Counseling Sessions</h2>
        <p className="text-gray-600">Book anonymous sessions with qualified professionals</p>
      </div>

      {bookings.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">My Upcoming Sessions</h3>
          <div className="space-y-3">
            {bookings.filter(b => b.status === 'scheduled').map((booking) => (
              <motion.div key={booking.id} className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Session with {booking.counselorName}</h4>
                    <p className="text-sm text-gray-600">{format(booking.date, 'MMMM d, yyyy')} at {booking.time}</p>
                    <p className="text-xs text-gray-500">Your session will appear on the dashboard when the counselor starts it.</p>
                  </div>
                  <span className={`px-3 py-1 text-xs rounded-full flex items-center space-x-1 ${getTypeColor(booking.type)}`}>
                    {getTypeIcon(booking.type)} <span className="capitalize">{booking.type}</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Date</h3>
        <div className="grid grid-cols-7 gap-2">
          {getWeekDays().map((day) => (
            <motion.button key={day.toISOString()} onClick={() => setSelectedDate(day)} className={`p-3 text-center rounded-lg ${isSameDay(day, selectedDate) ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}>
              <div className="text-sm font-medium">{format(day, 'd')}</div>
              <div className="text-xs">{format(day, 'EEE')}</div>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Slots for {format(selectedDate, 'MMMM d, yyyy')}</h3>
        {slotsForDate.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No available slots for this date.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {slotsForDate.map((slot) => (
              <motion.div key={slot.id} whileHover={{ scale: 1.02 }} className="border rounded-lg p-4 hover:border-blue-300 cursor-pointer" onClick={() => { setSelectedSlot(slot); setShowBookingForm(true); }}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{slot.counselorName}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full flex items-center space-x-1 ${getTypeColor(slot.type)}`}>{getTypeIcon(slot.type)} <span className="capitalize">{slot.type}</span></span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600"><Clock className="w-4 h-4" /><span>{slot.time}</span></div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {showBookingForm && selectedSlot && (
        <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Confirm Booking</h3>
            <div className="space-y-4 mb-6">
              <p><strong>Counselor:</strong> {selectedSlot.counselorName}</p>
              <p><strong>Date & Time:</strong> {format(selectedSlot.date, 'MMMM d, yyyy')} at {selectedSlot.time}</p>
              <p><strong>Type:</strong> <span className="capitalize">{selectedSlot.type}</span></p>
            </div>
            <div className="flex space-x-3">
              <button onClick={handleBookSlot} className="flex-1 bg-blue-600 text-white py-2 rounded-lg">Confirm</button>
              <button onClick={() => setShowBookingForm(false)} className="flex-1 bg-gray-200 py-2 rounded-lg">Cancel</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default CounselingBooking;
