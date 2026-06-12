'use client';

import { useState } from 'react';

interface ProfileFormProps {
  user: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    username: string | null;
    phone: string | null;
    address: string | null;
  };
  onSaved: () => void;
}

export default function ProfileForm({ user, onSaved }: ProfileFormProps) {
  const [firstName, setFirstName] = useState(user.firstName || '');
  const [lastName, setLastName] = useState(user.lastName || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [address, setAddress] = useState(user.address || '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, firstName, lastName, phone, address }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      onSaved();
    } catch (e) {
      console.error('Error saving profile:', e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="text-center mb-6">
        <div className="text-5xl mb-2">
          {user.firstName ? user.firstName.charAt(0).toUpperCase() : '👤'}
        </div>
        <h2 className="text-lg font-bold">
          {user.firstName || ''} {user.lastName || ''}
        </h2>
        {user.username && (
          <p className="text-sm tg-hint">@{user.username}</p>
        )}
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="text-xs tg-hint block mb-1">First Name</label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-sm outline-none focus:ring-2 focus:ring-[var(--tg-theme-button-color)]"
            />
          </div>
          <div className="flex-1">
            <label className="text-xs tg-hint block mb-1">Last Name</label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-sm outline-none focus:ring-2 focus:ring-[var(--tg-theme-button-color)]"
            />
          </div>
        </div>

        <div>
          <label className="text-xs tg-hint block mb-1">Phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1234567890"
            className="w-full px-3 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-sm outline-none focus:ring-2 focus:ring-[var(--tg-theme-button-color)]"
          />
        </div>

        <div>
          <label className="text-xs tg-hint block mb-1">Default Shipping Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Street, city, postal code, country"
            rows={3}
            className="w-full px-3 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-sm outline-none focus:ring-2 focus:ring-[var(--tg-theme-button-color)] resize-none"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full py-3 rounded-xl tg-button text-base font-semibold cursor-pointer disabled:opacity-50"
      >
        {saving ? 'Saving...' : saved ? 'Saved! ✓' : 'Save Profile'}
      </button>
    </div>
  );
}
